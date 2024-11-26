/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const checkTransaction = /* GraphQL */ `query CheckTransaction($transactionID: String!) {
  checkTransaction(transactionID: $transactionID)
}
` as GeneratedQuery<
  APITypes.CheckTransactionQueryVariables,
  APITypes.CheckTransactionQuery
>;
export const getTransaction = /* GraphQL */ `query GetTransaction($id: ID!) {
  getTransaction(id: $id) {
    amount
    category
    createdAt
    id
    isFraudulent
    isUserValidated
    latitude
    longitude
    owner
    updatedAt
    userID
    vendor
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTransactionQueryVariables,
  APITypes.GetTransactionQuery
>;
export const listTransactions = /* GraphQL */ `query ListTransactions(
  $filter: ModelTransactionFilterInput
  $limit: Int
  $nextToken: String
) {
  listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      amount
      category
      createdAt
      id
      isFraudulent
      isUserValidated
      latitude
      longitude
      owner
      updatedAt
      userID
      vendor
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTransactionsQueryVariables,
  APITypes.ListTransactionsQuery
>;
