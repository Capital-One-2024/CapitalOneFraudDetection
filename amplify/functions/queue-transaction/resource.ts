import { defineFunction } from "@aws-amplify/backend";

export const queueTransaction = defineFunction({
    name: "queue-transaction",
    entry: "./handler.ts",
});
