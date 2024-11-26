import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { checkTransaction } from "../functions/check-transaction/resource";
import { queueTransaction } from "../functions/queue-transaction/resource";

// a.schema: this is the whole db, acts as the container for all the models (tables)
// a.model: this is the table when translating to DynamoDB.
// a.model: Provides create, read, update, delete, subscription API
// a.model: adds in all the appsync resolvers so you don't have to do it
const schema = a
    .schema({
        Transaction: a
            .model({
                userID: a.string(),
                vendor: a.string(),
                category: a.string(),
                amount: a.float(),
                // longitude and latitude are for location
                longitude: a.float(),
                latitude: a.float(),
                isFraudulent: a.boolean().required().default(true),
                isUserValidated: a.boolean().required().default(false),
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
