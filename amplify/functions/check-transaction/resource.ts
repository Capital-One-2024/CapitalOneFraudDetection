import { defineFunction } from "@aws-amplify/backend";

export const checkTransaction = defineFunction({
    name: "check-transaction",
    entry: "./handler.ts",
});
