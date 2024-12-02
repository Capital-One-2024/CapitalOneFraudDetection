/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateTransaction = /* GraphQL */ `subscription OnCreateTransaction(
  $filter: ModelSubscriptionTransactionFilterInput
  $owner: String
) {
  onCreateTransaction(filter: $filter, owner: $owner) {
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
export const onDeleteTransaction = /* GraphQL */ `subscription OnDeleteTransaction(
  $filter: ModelSubscriptionTransactionFilterInput
  $owner: String
) {
  onDeleteTransaction(filter: $filter, owner: $owner) {
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
export const onUpdateTransaction = /* GraphQL */ `subscription OnUpdateTransaction(
  $filter: ModelSubscriptionTransactionFilterInput
  $owner: String
) {
  onUpdateTransaction(filter: $filter, owner: $owner) {
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
