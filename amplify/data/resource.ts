import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { checkTransaction } from "../functions/check-transaction/resource";
import { queueTransaction } from "../functions/queue-transaction/resource";

const schema = a
    .schema({
        Transaction: a
            .model({
                type: a.string().default("Transaction").required(),
                userId: a.id().required(),
                accountId: a.id(),
                account: a.belongsTo("Account", "accountId"),
                vendor: a.string().required(),
                category: a.string().required(),
                amount: a.float().required(),
                longitude: a.float().required(),
                latitude: a.float().required(),
                isFraudulent: a.boolean().required().default(true),
                isUserValidated: a.boolean().required().default(false),
                isProcessed: a.boolean().required().default(false),
                createdAt: a.timestamp().required(),
                updatedAt: a.timestamp().required(),
            })
            .secondaryIndexes((index) => [
                index("type").sortKeys(["createdAt"]).queryField("listByCreationDate"),
            ])
            .authorization((allow) => [allow.owner()]),
        Account: a
            .model({
                accountName: a.string().required(),
                userId: a.string().required(),
                balance: a.float().required().default(0),
                transactions: a.hasMany("Transaction", "accountId"),
            })
            .authorization((allow) => [allow.owner()]),
        checkTransaction: a
            .query()
            .arguments({ transactionID: a.string().required() })
            .returns(
                a.customType({
                    statusCode: a.integer(),
                    message: a.string(),
                })
            )
            .handler(a.handler.function(checkTransaction))
            .authorization((allow) => allow.authenticated()),
        queueTransaction: a
            .query()
            .arguments({ transactionID: a.string().required() })
            .returns(
                a.customType({
                    statusCode: a.integer(),
                    message: a.string(),
                })
            )
            .handler(a.handler.function(queueTransaction))
            .authorization((allow) => allow.authenticated()),
    })
    .authorization((allow) => [
        allow.authenticated(),
        allow.resource(checkTransaction),
        allow.resource(queueTransaction),
    ]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: "userPool",
    },
});
