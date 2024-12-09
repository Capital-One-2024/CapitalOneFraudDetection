import { defineFunction } from "@aws-amplify/backend";

export const checkTransaction = defineFunction({
    name: "check-transaction",
    entry: "./handler.ts",
    // Increase the timeout to 5 minutes to allow the function to process the transaction
    timeoutSeconds: 5 * 60,
});
