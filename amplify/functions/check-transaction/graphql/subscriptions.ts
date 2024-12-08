/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateAccount = /* GraphQL */ `subscription OnCreateAccount(
  $filter: ModelSubscriptionAccountFilterInput
  $owner: String
) {
  onCreateAccount(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAccountSubscriptionVariables,
  APITypes.OnCreateAccountSubscription
>;
export const onCreateTransaction = /* GraphQL */ `subscription OnCreateTransaction(
  $filter: ModelSubscriptionTransactionFilterInput
  $owner: String
) {
  onCreateTransaction(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTransactionSubscriptionVariables,
  APITypes.OnCreateTransactionSubscription
>;
export const onDeleteAccount = /* GraphQL */ `subscription OnDeleteAccount(
  $filter: ModelSubscriptionAccountFilterInput
  $owner: String
) {
  onDeleteAccount(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAccountSubscriptionVariables,
  APITypes.OnDeleteAccountSubscription
>;
export const onDeleteTransaction = /* GraphQL */ `subscription OnDeleteTransaction(
  $filter: ModelSubscriptionTransactionFilterInput
  $owner: String
) {
  onDeleteTransaction(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTransactionSubscriptionVariables,
  APITypes.OnDeleteTransactionSubscription
>;
export const onUpdateAccount = /* GraphQL */ `subscription OnUpdateAccount(
  $filter: ModelSubscriptionAccountFilterInput
  $owner: String
) {
  onUpdateAccount(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAccountSubscriptionVariables,
  APITypes.OnUpdateAccountSubscription
>;
export const onUpdateTransaction = /* GraphQL */ `subscription OnUpdateTransaction(
  $filter: ModelSubscriptionTransactionFilterInput
  $owner: String
) {
  onUpdateTransaction(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTransactionSubscriptionVariables,
  APITypes.OnUpdateTransactionSubscription
>;
