import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

// a.schema: this is the whole db, acts as the container for all the models (tables)
// a.model: this is the table when translating to DynamoDB. 
// a.model: Provides create, read, update, delete, subscription API
// a.model: adds in all the appsync resolvers so you don't have to do it
const schema = a.schema({

  Transaction: a
    .model({
      id: a.id(),
      userID: a.string(),
      category: a.string(),
      amount: a.float(),
      location: a.string(),
      isFraudulent: a.boolean().required().default(true),
      isUserValidated: a.boolean().required().default(false),
      // 1. Reference field for Vendor
      vendorID: a.id(),
      // 2. Create relationship field with the reference field
      vendor: a.belongsTo('Vendor', 'vendorID'),
    }).authorization((allow) => [allow.owner()]),

    Vendor: a.model({
      id: a.id(), // Unique ID for the vendor
      name: a.string().required(), // Vendor name
      category: a.string().required(), // Category of the vendor
      // 3. Create a hasMany relationship with the reference field
      transactions: a.hasMany("Transaction", "vendorID")
    }),

 });
 

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
});