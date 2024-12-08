/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createAccount = /* GraphQL */ `mutation CreateAccount(
  $condition: ModelAccountConditionInput
  $input: CreateAccountInput!
) {
  createAccount(condition: $condition, input: $input) {
    accountName
    balance
    createdAt
    id
    owner
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateAccountMutationVariables,
  APITypes.CreateAccountMutation
>;
export const createTransaction = /* GraphQL */ `mutation CreateTransaction(
  $condition: ModelTransactionConditionInput
  $input: CreateTransactionInput!
) {
  createTransaction(condition: $condition, input: $input) {
    accountId
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
    userId
    vendor
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTransactionMutationVariables,
  APITypes.CreateTransactionMutation
>;
export const deleteAccount = /* GraphQL */ `mutation DeleteAccount(
  $condition: ModelAccountConditionInput
  $input: DeleteAccountInput!
) {
  deleteAccount(condition: $condition, input: $input) {
    accountName
    balance
    createdAt
    id
    owner
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAccountMutationVariables,
  APITypes.DeleteAccountMutation
>;
export const deleteTransaction = /* GraphQL */ `mutation DeleteTransaction(
  $condition: ModelTransactionConditionInput
  $input: DeleteTransactionInput!
) {
  deleteTransaction(condition: $condition, input: $input) {
    accountId
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
    userId
    vendor
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTransactionMutationVariables,
  APITypes.DeleteTransactionMutation
>;
export const updateAccount = /* GraphQL */ `mutation UpdateAccount(
  $condition: ModelAccountConditionInput
  $input: UpdateAccountInput!
) {
  updateAccount(condition: $condition, input: $input) {
    accountName
    balance
    createdAt
    id
    owner
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateAccountMutationVariables,
  APITypes.UpdateAccountMutation
>;
export const updateTransaction = /* GraphQL */ `mutation UpdateTransaction(
  $condition: ModelTransactionConditionInput
  $input: UpdateTransactionInput!
) {
  updateTransaction(condition: $condition, input: $input) {
    accountId
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
    userId
    vendor
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTransactionMutationVariables,
  APITypes.UpdateTransactionMutation
>;
