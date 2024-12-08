/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const checkTransaction = /* GraphQL */ `query CheckTransaction($transactionID: String!) {
  checkTransaction(transactionID: $transactionID) {
    message
    statusCode
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CheckTransactionQueryVariables,
  APITypes.CheckTransactionQuery
>;
export const getAccount = /* GraphQL */ `query GetAccount($id: ID!) {
  getAccount(id: $id) {
    accountName
    balance
    createdAt
    id
    owner
    transactions {
      nextToken
      __typename
    }
    updatedAt
    userID
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAccountQueryVariables,
  APITypes.GetAccountQuery
>;
export const getTransaction = /* GraphQL */ `query GetTransaction($id: ID!) {
  getTransaction(id: $id) {
    account {
      accountName
      balance
      createdAt
      id
      owner
      updatedAt
      userID
      __typename
    }
    accountID
    amount
    category
    createdAt
    id
    isFraudulent
    isProcessed
    isUserValidated
    latitude
    longitude
    owner
    type
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
export const listAccounts = /* GraphQL */ `query ListAccounts(
  $filter: ModelAccountFilterInput
  $limit: Int
  $nextToken: String
) {
  listAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      accountName
      balance
      createdAt
      id
      owner
      updatedAt
      userID
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAccountsQueryVariables,
  APITypes.ListAccountsQuery
>;
export const listByCreationDate = /* GraphQL */ `query ListByCreationDate(
  $createdAt: ModelIntKeyConditionInput
  $filter: ModelTransactionFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $type: String!
) {
  listByCreationDate(
    createdAt: $createdAt
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    type: $type
  ) {
    items {
      accountID
      amount
      category
      createdAt
      id
      isFraudulent
      isProcessed
      isUserValidated
      latitude
      longitude
      owner
      type
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
  APITypes.ListByCreationDateQueryVariables,
  APITypes.ListByCreationDateQuery
>;
export const listTransactions = /* GraphQL */ `query ListTransactions(
  $filter: ModelTransactionFilterInput
  $limit: Int
  $nextToken: String
) {
  listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      accountID
      amount
      category
      createdAt
      id
      isFraudulent
      isProcessed
      isUserValidated
      latitude
      longitude
      owner
      type
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
export const queueTransaction = /* GraphQL */ `query QueueTransaction($transactionID: String!) {
  queueTransaction(transactionID: $transactionID) {
    message
    statusCode
    __typename
  }
}
` as GeneratedQuery<
  APITypes.QueueTransactionQueryVariables,
  APITypes.QueueTransactionQuery
>;
