import { Amplify } from "aws-amplify";
import { Schema } from "../../data/resource";
import { generateClient } from "aws-amplify/data";
import { env } from "$amplify/env/check-transaction";
import { getTransaction } from "./graphql/queries";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { Handler } from "aws-lambda";

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

const dataClient = generateClient<Schema>();

const lambdaClient = new LambdaClient({ region: process.env.AWS_REGION });

export const handler: Handler = async (event) => {
    // Extract the body from the event and parse it
    // as the expected type of (Schema["queueTransaction"]["args"])
    // we expect the queue to pass its args as body with no changes.
    const body = JSON.parse(event.body) as Schema["queueTransaction"]["args"];

    // Extract the transactionID from the body
    const transactionID = body.transactionID;

    // Get the transaction with the given id from the db.
    const res = await dataClient.graphql({
        query: getTransaction,
        variables: {
            id: transactionID,
        },
    });

    // If the transaction is not found, return a 404 response.
    if (!res.data.getTransaction) {
        // Log that the transaction was not found
        console.error("Transaction not found.");
        // Return not error so SQS doesn't retry
        return false;
    }

    // Prepare the payload for the external Lambda function
    // the payload should be the info needed to run the fraud prediction
    const command = new InvokeCommand({
        FunctionName: "externalTestingFunction",
        Payload: JSON.stringify({ transactionID: res.data.getTransaction.id }),
    });

    try {
        // Invoke the external Lambda function
        const externalRes = await lambdaClient.send(command);

        // Parse the response from the external Lambda function
        const externalResPayload = externalRes.Payload;

        // Log the response from the external Lambda function -- for debugging
        console.log("Python Lambda Response:", externalResPayload);

        // Return so the SQS doesn't retry
        return true;
    } catch (error: unknown) {
        // Log the error
        console.error("Error invoking Python Lambda:", error);
        // throw an error so SQS retries
        throw new Error("Failed to invoke fraud detection Lambda.");
    }
};
