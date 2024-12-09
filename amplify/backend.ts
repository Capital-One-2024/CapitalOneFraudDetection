import { defineBackend } from "@aws-amplify/backend";
import * as eventsources from "aws-cdk-lib/aws-lambda-event-sources";
import * as sqs from "aws-cdk-lib/aws-sqs";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { checkTransaction } from "./functions/check-transaction/resource";
import { queueTransaction } from "./functions/queue-transaction/resource";
import { Duration } from "aws-cdk-lib";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
    auth,
    data,
    checkTransaction,
    queueTransaction,
});

// Create a new stack to store the SQS queue
const resourceStack = backend.createStack("CapitalOneResourceStack");

// Create an SQS queue to store the transaction messages
const capitalOneQueue = new sqs.Queue(resourceStack, "CapitalOneQueue", {
    // Enable FIFO queue - will help us deduplicate messages
    fifo: true,
    contentBasedDeduplication: true,
});

// Add the queue URL to the queueTransaction function environment variables
// to access the queue URL from the function
backend.queueTransaction.addEnvironment("CAPITAL_ONE_QUEUE_URL", capitalOneQueue.queueUrl);

// Grant the queueTransaction function permission to send messages to the queue
capitalOneQueue.grantSendMessages(backend.queueTransaction.resources.lambda.role!);

// Add the user pool ID to the checkTransaction function environment variables
backend.checkTransaction.addEnvironment(
    "CAPITAL_ONE_USER_POOL_ID",
    backend.auth.resources.userPool.userPoolId
);

// Add the Amplify Lambda Invoke policy to the checkTransaction function
// to allow it to invoke the python-predictor function
backend.checkTransaction.resources.lambda.role?.addManagedPolicy({
    managedPolicyArn: "arn:aws:iam::412381780180:policy/Capital-One-Amplify-Lambda-Invoke-Policy",
});

// Add the Amplify Cognito policy to the checkTransaction function
// to allow it to access the user pool
backend.checkTransaction.resources.lambda.role?.addManagedPolicy({
    managedPolicyArn: "arn:aws:iam::412381780180:policy/Capital-One-Amplify-Cognito-Policy",
});

// Trigger the checkTransaction function when a message is sent to the queue
backend.checkTransaction.resources.lambda.addEventSource(
    new eventsources.SqsEventSource(capitalOneQueue)
);
