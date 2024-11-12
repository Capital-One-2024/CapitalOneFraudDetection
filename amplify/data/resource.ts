import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/

// a.schema: this is the whole db, acts as the container for all the models (tables)
// a.model: this is the table when translating to DynamoDB. 
// a.model: Provides create, read, update, delete, subscription API
// a.model: adds in all the appsync resolvers so you don't have to do it
const schema = a.schema({
  User: a
    .model({
      userID: a.id(),
      firstName: a.string(),
      lastName: a.string(),
      email: a.string(), // should be unique
      password: a.string(), // should be hashed
      accounts: a.hasMany('Account', 'user') // User has multiple accounts
    }),
 
 
  Account: a
    .model({
      accountID: a.id(),
      type: a.enum(['CHECKINGS', 'SAVINGS']), // or maybe a.string()?
      user: a.belongsTo('User', 'accounts'), // foreign key reference
      transactions: a.hasMany('Transaction', 'account') // account has multiple transactions
    }),
 
 
  Transaction: a
    .model({
      transactionID: a.id(),
      account: a.belongsTo('Account', 'transactions'), // foreign key reference
      vendor: a.string(),
      category: a.string(),
      dateTime: a.datetime(), // or maybe a.string()?
      amount: a.float(),
      distanceFromLastTransaction: a.float(),
      timeFromLastTransaction: a.float(),
      prediction: a.integer(), // Prediction of fraud (-1, 1)
      predictionAccurate: a.integer().default(0) // Accuracy of prediction (1, -1) 0 by default
    })
 });
 

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
