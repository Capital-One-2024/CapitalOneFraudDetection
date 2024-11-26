import { Schema } from "../../data/resource";
import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";

export const handler: Schema["queueTransaction"]["functionHandler"] = async (event) => {
    const { transactionID } = event.arguments;

    const sqsClient = new SQSClient({ region: process.env.AWS_REGION });
    const payload = JSON.stringify({ transactionID });

    const command = new SendMessageCommand({
        QueueUrl: process.env.CAPITAL_ONE_QUEUE_URL,
        MessageBody: payload,
    });

    try {
        await sqsClient.send(command);
        console.log("Message sent to SQS");
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Message sent to SQS" }),
        };
    } catch (error) {
        console.error("Error sending message to SQS: ", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error sending message to SQS" }),
        };
    }
};
