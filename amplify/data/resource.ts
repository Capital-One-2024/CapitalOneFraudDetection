import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

// a.schema: this is the whole db, acts as the container for all the models (tables)
// a.model: this is the table when translating to DynamoDB.
// a.model: Provides create, read, update, delete, subscription API
// a.model: adds in all the appsync resolvers so you don't have to do it
const schema = a.schema({
    Transaction: a
        .model({
            userID: a.string(),
            accountID: a.string(),
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

    Account: a
        .model({
            accountName: a.string(),
            userID: a.string(),
            balance: a.float(),
        })
        .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: "userPool",
    },
});
