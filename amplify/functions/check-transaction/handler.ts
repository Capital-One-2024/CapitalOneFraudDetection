import { Amplify } from "aws-amplify";
import { Schema } from "../../data/resource";
import { generateClient } from "aws-amplify/data";
import { env } from "$amplify/env/check-transaction";
import { listTransactions, listByCreationDate } from "./graphql/queries";
import { updateTransaction } from "./graphql/mutations";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { SQSEvent, SQSHandler } from "aws-lambda";
import { ModelSortDirection } from "./graphql/API";
import haversine from "haversine-distance";
import {
    CognitoIdentityProviderClient,
    ListUsersCommand,
} from "@aws-sdk/client-cognito-identity-provider";

// Define the type for the response from the prediction Lambda function
type Prediction = {
    id: string;
    isFraudulent: boolean;
};

type PredictionLambdaResponse = {
    predictions: Prediction[];
};

// Configure the Amplify client
// - this is required to set the auth needed to interact with the GraphQL API
Amplify.configure(
    {
        API: {
            GraphQL: {
                endpoint: env.AMPLIFY_DATA_GRAPHQL_ENDPOINT,
                region: env.AWS_REGION,
                defaultAuthMode: "identityPool",
            },
        },
    },
    {
        Auth: {
            credentialsProvider: {
                getCredentialsAndIdentityId: async () => ({
                    credentials: {
                        accessKeyId: env.AWS_ACCESS_KEY_ID,
                        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
                        sessionToken: env.AWS_SESSION_TOKEN,
                    },
                }),
                clearCredentialsAndIdentityId: () => {
                    /* noop */
                },
            },
        },
    }
);

// The client we will use to interact with the GraphQL API
const dataClient = generateClient<Schema>();

// The client we will use to interact with the Lambda API
// - allows us to invoke external Lambda functions
const lambdaClient = new LambdaClient({ region: process.env.AWS_REGION });

const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });

/**
 * Get the rules that will be used to filter the transactions table
 * to only get the transactions with the given IDs.
 * @param {string[]} transactionIDs - The IDs of the transactions to filter by.
 * @returns {object} The filter rules to filter the transactions table.
 */
const getFilterRules = (transactionIDs: string[]): object => {
    return {
        or: transactionIDs.map((transactionID) => ({
            id: {
                eq: transactionID,
            },
        })),
    };
};

/**
 * Decode the response from a Lambda function.
 * @param response - The response from the Lambda function.
 * @returns The decoded response.
 */
const decodeLambdaResponse = <
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    T extends {},
>(
    response: Uint8Array
): T => {
    const decoder = new TextDecoder("ascii");
    const jsonString = decoder.decode(response);
    const parsed = JSON.parse(jsonString);
    return parsed as T;
};

/**
 * Get the transaction that was created before the given transaction in the given account.
 * @param {string} accountId - The ID of the account to get the previous transaction for.
 * @param {string} currTransactionId - The ID of the current transaction.
 * @returns The previous transaction for the given account.
 */
const getPreviousTransaction = async (accountId: string, currTransactionId: string) => {
    return await dataClient.graphql({
        query: listByCreationDate,
        variables: {
            type: "Transaction",
            sortDirection: ModelSortDirection.DESC,
            limit: 2,
            filter: {
                and: [
                    {
                        accountId: {
                            eq: accountId,
                        },
                    },
                    {
                        id: {
                            ne: currTransactionId,
                        },
                    },
                ],
            },
        },
    });
};

/**
 * The handler function for the check-transaction Lambda function.
 * Note: This function is triggered by an SQS event.
 * @param {SQSEvent} event - The SQS event containing the records to process.
 */
export const handler: SQSHandler = async (event: SQSEvent) => {
    // Extract the records from the event.
    const records = event.Records;

    // Extract the transactionIDs from the records
    const TRANSACTION_IDS = records.map((record) => {
        const body = JSON.parse(record.body) as Schema["queueTransaction"]["args"];
        return body.transactionID;
    });

    // Get the filter rules for the transaction IDs
    const filterRules = getFilterRules(TRANSACTION_IDS);

    // Get the transaction with the given id from the db.
    const res = await dataClient.graphql({
        query: listTransactions,
        variables: {
            filter: filterRules,
        },
    });

    // If we failed to load the transactions info from the DB,
    // then quit the execution with an error so SQS retries
    if (res.errors) {
        console.error("Error fetching transactions:", res.errors);
        throw new Error("Failed to fetch transactions.");
    }

    // If there are no transactions, log an error and return false.
    // We want to return instead of throwing an error so that the SQS message is deleted.
    // This way, we don't keep retrying to process the message knowing that
    // there are no transactions with the given IDs.
    if (!res.data.listTransactions.items) {
        console.error("No transactions found.");
        return;
    }

    // Extract the transactions from the response
    const PARSED_TRANSACTION_LIST = res.data.listTransactions.items;

    // For each transaction, get the previous transaction
    // and store the current and previous transactions together: { current, prev }
    // so we can calculate the time and distance difference between them.
    // We use Promise.all to run the async operations concurrently.
    const TRANSACTIONS_WITH_PREVIOUS = await Promise.all(
        PARSED_TRANSACTION_LIST.map(async (transaction) => {
            const prevTransaction = await getPreviousTransaction(
                transaction.accountId,
                transaction.id
            );
            return {
                current: transaction,
                prev: prevTransaction.data.listByCreationDate.items.shift(),
            };
        })
    );

    // Go over the pairs of transactions and prepare the data for the prediction Lambda function
    const TRANSACTION_FEATURES = TRANSACTIONS_WITH_PREVIOUS.map(({ current, prev }) => {
        // Extract the base features from the current transaction
        const features = {
            id: current.id,
            timestamp: current.createdAt,
            amount: current.amount,
            category: current.category,
        };

        // If there is no previous transaction,
        // then we can assume the difference in time and distance is 0
        if (!prev) {
            // early return the prepared features
            return {
                ...features,
                timeSinceLastTransaction: 0,
                distanceFromPreviousTransaction: 0,
            };
        }

        // ---- At this point, we know there is a previous transaction ----

        // Calculate the time difference between the two transactions in seconds
        const timeSinceLastTransaction = (current.createdAt - prev.createdAt) / 1000;

        // Calculate the distance between the two transactions in meters
        const distanceFromPreviousTransaction = haversine(
            { latitude: current.latitude, longitude: current.longitude },
            { latitude: prev.latitude, longitude: prev.longitude }
        );

        // Return the prepared features
        return {
            ...features,
            timeSinceLastTransaction,
            distanceFromPreviousTransaction,
        };
    });

    // Will hold the command that will invoke the prediction Lambda function
    let predictionInvokeCommand: InvokeCommand;

    // Try to prepare the command that will invoke the prediction Lambda function
    // Catch any errors and log them
    // - On failure, quit the execution with an error so SQS retries
    try {
        predictionInvokeCommand = new InvokeCommand({
            FunctionName: "myLambda",
            Payload: JSON.stringify({ transactions: TRANSACTION_FEATURES }),
        });
    } catch (error: unknown) {
        // Log the error
        console.error("Error preparing prediction Lambda invocation:", error);

        // throw an error so SQS retries
        throw new Error("Failed to prepare fraud detection Lambda invocation.");
    }

    // Will hold the predictions from the prediction Lambda function
    let predictions: Prediction[];

    // Invoke the prediction Lambda function
    // Catch any errors and log them
    // - On failure, quit the execution with an error so SQS retries
    try {
        // Invoke the prediction Lambda function
        const predictionLambdaResponse = await lambdaClient.send(predictionInvokeCommand);

        // Check if we got a response from the prediction Lambda function
        if (!predictionLambdaResponse.Payload) {
            // Log the error
            console.error("Prediction Lambda response is empty.");

            // throw an error so SQS retries
            throw new Error("Prediction Lambda response is empty.");
        }

        // Parse the response from the prediction Lambda function
        predictions = decodeLambdaResponse<PredictionLambdaResponse>(
            predictionLambdaResponse.Payload
        ).predictions;
    } catch (error: unknown) {
        // Log the error
        console.error(error);

        // throw an error so SQS retries
        throw error;
    }

    // Go over the predictions and update the transactions in the DB
    try {
        // Update the transactions in the DB with the predictions
        // We use Promise.all to run the async operations concurrently.
        await Promise.all(
            predictions.map(async ({ id, isFraudulent }) => {
                // Get the account ID for the transaction
                const transaction = PARSED_TRANSACTION_LIST.find((t) => t.id === id)!;

                // Update the transaction with the prediction
                await dataClient.graphql({
                    query: updateTransaction,
                    variables: {
                        condition: {
                            accountId: { eq: transaction.accountId },
                        },
                        input: {
                            id: id,
                            isFraudulent: isFraudulent,
                            isProcessed: true,
                            updatedAt: Date.now(),
                        },
                    },
                });
            })
        );

        // Log the successful update
        console.log("Successfully updated transactions.");
    } catch (error: unknown) {
        // Log the error
        console.error("Error updating transactions:", error);

        // throw an error so SQS retries
        throw error;
    }

    // Will hold the command that will invoke the emailer (SES) Lambda function
    let emailerInvokeCommand: InvokeCommand;

    // Try to prepare the command that will invoke the prediction Lambda function
    // Catch any errors and log them
    // - On failure, quit the execution with an error so SQS retries
    try {
        const emailerPayload = await Promise.all(
            predictions.map(async ({ id }) => {
                // Get the transaction with the given id
                const transaction = PARSED_TRANSACTION_LIST.find((t) => t.id === id)!;
                const prediction = predictions.find((p) => p.id === id)!;

                // Get the user associated with the transaction
                console.log("transaction owner", transaction.owner);
                console.log("transaction account ID", transaction.accountId);

                const result = await cognitoClient.send(
                    new ListUsersCommand({
                        UserPoolId: process.env.CAPITAL_ONE_USER_POOL_ID,
                        AttributesToGet: ["email"],
                        Filter: `sub = "${transaction.userId}"`,
                    })
                );

                const users = result.Users!;
                const user = users[0];

                const features = {
                    isFraudulent: prediction.isFraudulent,
                    amount: transaction.amount,
                    date: new Date(transaction.createdAt).toLocaleString(),
                    email: user.Attributes!.find((attr) => attr.Name === "email")!.Value,
                    vendor: transaction.vendor,
                    category: transaction.category,
                };

                return features;
            })
        );

        emailerInvokeCommand = new InvokeCommand({
            FunctionName: "c1EmailerFunction",
            Payload: JSON.stringify({ transactions: emailerPayload }),
        });
    } catch (error: unknown) {
        // Log the error
        console.error("Error preparing SES Lambda invocation:", error);

        // throw an error so SQS retries
        throw new Error("Failed to prepare fraud detection Lambda invocation.");
    }

    // Invoke the emailer Lambda function
    // Catch any errors and log them
    // - On failure, quit the execution with an error so SQS retries
    try {
        // Invoke the emailer Lambda function
        await lambdaClient.send(emailerInvokeCommand);

        // Log the successful invocation
        console.log("Successfully invoked emailer Lambda function.");
    } catch (error: unknown) {
        // Log the error
        console.error("Error invoking emailer Lambda function:", error);

        // throw an error so SQS retries
        throw error;
    }
};
