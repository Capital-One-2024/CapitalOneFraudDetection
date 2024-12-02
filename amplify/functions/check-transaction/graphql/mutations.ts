/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createTransaction = /* GraphQL */ `mutation CreateTransaction(
  $condition: ModelTransactionConditionInput
  $input: CreateTransactionInput!
) {
  createTransaction(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateTransactionMutationVariables,
  APITypes.CreateTransactionMutation
>;
export const deleteTransaction = /* GraphQL */ `mutation DeleteTransaction(
  $condition: ModelTransactionConditionInput
  $input: DeleteTransactionInput!
) {
  deleteTransaction(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteTransactionMutationVariables,
  APITypes.DeleteTransactionMutation
>;
export const updateTransaction = /* GraphQL */ `mutation UpdateTransaction(
  $condition: ModelTransactionConditionInput
  $input: UpdateTransactionInput!
) {
  updateTransaction(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateTransactionMutationVariables,
  APITypes.UpdateTransactionMutation
>;
