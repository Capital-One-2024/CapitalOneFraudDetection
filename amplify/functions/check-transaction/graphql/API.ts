/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CheckTransactionReturnType = {
  __typename: "CheckTransactionReturnType",
  message?: string | null,
  statusCode?: number | null,
};

export type Account = {
  __typename: "Account",
  accountName: string,
  balance: number,
  createdAt: string,
  id: string,
  owner?: string | null,
  updatedAt: string,
  userId: string,
};

export type Transaction = {
  __typename: "Transaction",
  accountId: string,
  amount: number,
  category: string,
  createdAt: number,
  id: string,
  isFraudulent: boolean,
  isProcessed: boolean,
  isUserValidated: boolean,
  latitude: number,
  longitude: number,
  owner?: string | null,
  type: string,
  updatedAt: number,
  userId: string,
  vendor: string,
};

export type ModelAccountFilterInput = {
  accountName?: ModelStringInput | null,
  and?: Array< ModelAccountFilterInput | null > | null,
  balance?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelAccountFilterInput | null,
  or?: Array< ModelAccountFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelFloatInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelAccountConnection = {
  __typename: "ModelAccountConnection",
  items:  Array<Account | null >,
  nextToken?: string | null,
};

export type ModelIntKeyConditionInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
};

export type ModelTransactionFilterInput = {
  accountId?: ModelIDInput | null,
  amount?: ModelFloatInput | null,
  and?: Array< ModelTransactionFilterInput | null > | null,
  category?: ModelStringInput | null,
  createdAt?: ModelIntInput | null,
  id?: ModelIDInput | null,
  isFraudulent?: ModelBooleanInput | null,
  isProcessed?: ModelBooleanInput | null,
  isUserValidated?: ModelBooleanInput | null,
  latitude?: ModelFloatInput | null,
  longitude?: ModelFloatInput | null,
  not?: ModelTransactionFilterInput | null,
  or?: Array< ModelTransactionFilterInput | null > | null,
  owner?: ModelStringInput | null,
  type?: ModelStringInput | null,
  updatedAt?: ModelIntInput | null,
  userId?: ModelIDInput | null,
  vendor?: ModelStringInput | null,
};

export type ModelIntInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  eq?: boolean | null,
  ne?: boolean | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelTransactionConnection = {
  __typename: "ModelTransactionConnection",
  items:  Array<Transaction | null >,
  nextToken?: string | null,
};

export type QueueTransactionReturnType = {
  __typename: "QueueTransactionReturnType",
  message?: string | null,
  statusCode?: number | null,
};

export type ModelAccountConditionInput = {
  accountName?: ModelStringInput | null,
  and?: Array< ModelAccountConditionInput | null > | null,
  balance?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  not?: ModelAccountConditionInput | null,
  or?: Array< ModelAccountConditionInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type CreateAccountInput = {
  accountName: string,
  balance: number,
  id?: string | null,
  userId: string,
};

export type ModelTransactionConditionInput = {
  accountId?: ModelIDInput | null,
  amount?: ModelFloatInput | null,
  and?: Array< ModelTransactionConditionInput | null > | null,
  category?: ModelStringInput | null,
  createdAt?: ModelIntInput | null,
  isFraudulent?: ModelBooleanInput | null,
  isProcessed?: ModelBooleanInput | null,
  isUserValidated?: ModelBooleanInput | null,
  latitude?: ModelFloatInput | null,
  longitude?: ModelFloatInput | null,
  not?: ModelTransactionConditionInput | null,
  or?: Array< ModelTransactionConditionInput | null > | null,
  owner?: ModelStringInput | null,
  type?: ModelStringInput | null,
  updatedAt?: ModelIntInput | null,
  userId?: ModelIDInput | null,
  vendor?: ModelStringInput | null,
};

export type CreateTransactionInput = {
  accountId: string,
  amount: number,
  category: string,
  createdAt: number,
  id?: string | null,
  isFraudulent: boolean,
  isProcessed: boolean,
  isUserValidated: boolean,
  latitude: number,
  longitude: number,
  type: string,
  updatedAt: number,
  userId: string,
  vendor: string,
};

export type DeleteAccountInput = {
  id: string,
};

export type DeleteTransactionInput = {
  id: string,
};

export type UpdateAccountInput = {
  accountName?: string | null,
  balance?: number | null,
  id: string,
  userId?: string | null,
};

export type UpdateTransactionInput = {
  accountId?: string | null,
  amount?: number | null,
  category?: string | null,
  createdAt?: number | null,
  id: string,
  isFraudulent?: boolean | null,
  isProcessed?: boolean | null,
  isUserValidated?: boolean | null,
  latitude?: number | null,
  longitude?: number | null,
  type?: string | null,
  updatedAt?: number | null,
  userId?: string | null,
  vendor?: string | null,
};

export type ModelSubscriptionAccountFilterInput = {
  accountName?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAccountFilterInput | null > | null,
  balance?: ModelSubscriptionFloatInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionAccountFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionFloatInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionTransactionFilterInput = {
  accountId?: ModelSubscriptionIDInput | null,
  amount?: ModelSubscriptionFloatInput | null,
  and?: Array< ModelSubscriptionTransactionFilterInput | null > | null,
  category?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  isFraudulent?: ModelSubscriptionBooleanInput | null,
  isProcessed?: ModelSubscriptionBooleanInput | null,
  isUserValidated?: ModelSubscriptionBooleanInput | null,
  latitude?: ModelSubscriptionFloatInput | null,
  longitude?: ModelSubscriptionFloatInput | null,
  or?: Array< ModelSubscriptionTransactionFilterInput | null > | null,
  owner?: ModelStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionIntInput | null,
  userId?: ModelSubscriptionIDInput | null,
  vendor?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionIntInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type CheckTransactionQueryVariables = {
  transactionID: string,
};

export type CheckTransactionQuery = {
  checkTransaction?:  {
    __typename: "CheckTransactionReturnType",
    message?: string | null,
    statusCode?: number | null,
  } | null,
};

export type GetAccountQueryVariables = {
  id: string,
};

export type GetAccountQuery = {
  getAccount?:  {
    __typename: "Account",
    accountName: string,
    balance: number,
    createdAt: string,
    id: string,
    owner?: string | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type GetTransactionQueryVariables = {
  id: string,
};

export type GetTransactionQuery = {
  getTransaction?:  {
    __typename: "Transaction",
    accountId: string,
    amount: number,
    category: string,
    createdAt: number,
    id: string,
    isFraudulent: boolean,
    isProcessed: boolean,
    isUserValidated: boolean,
    latitude: number,
    longitude: number,
    owner?: string | null,
    type: string,
    updatedAt: number,
    userId: string,
    vendor: string,
  } | null,
};

export type ListAccountsQueryVariables = {
  filter?: ModelAccountFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAccountsQuery = {
  listAccounts?:  {
    __typename: "ModelAccountConnection",
    items:  Array< {
      __typename: "Account",
      accountName: string,
      balance: number,
      createdAt: string,
      id: string,
      owner?: string | null,
      updatedAt: string,
      userId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListByCreationDateQueryVariables = {
  createdAt?: ModelIntKeyConditionInput | null,
  filter?: ModelTransactionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
  type: string,
};

export type ListByCreationDateQuery = {
  listByCreationDate?:  {
    __typename: "ModelTransactionConnection",
    items:  Array< {
      __typename: "Transaction",
      accountId: string,
      amount: number,
      category: string,
      createdAt: number,
      id: string,
      isFraudulent: boolean,
      isProcessed: boolean,
      isUserValidated: boolean,
      latitude: number,
      longitude: number,
      owner?: string | null,
      type: string,
      updatedAt: number,
      userId: string,
      vendor: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListTransactionsQueryVariables = {
  filter?: ModelTransactionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTransactionsQuery = {
  listTransactions?:  {
    __typename: "ModelTransactionConnection",
    items:  Array< {
      __typename: "Transaction",
      accountId: string,
      amount: number,
      category: string,
      createdAt: number,
      id: string,
      isFraudulent: boolean,
      isProcessed: boolean,
      isUserValidated: boolean,
      latitude: number,
      longitude: number,
      owner?: string | null,
      type: string,
      updatedAt: number,
      userId: string,
      vendor: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type QueueTransactionQueryVariables = {
  transactionID: string,
};

export type QueueTransactionQuery = {
  queueTransaction?:  {
    __typename: "QueueTransactionReturnType",
    message?: string | null,
    statusCode?: number | null,
  } | null,
};

export type CreateAccountMutationVariables = {
  condition?: ModelAccountConditionInput | null,
  input: CreateAccountInput,
};

export type CreateAccountMutation = {
  createAccount?:  {
    __typename: "Account",
    accountName: string,
    balance: number,
    createdAt: string,
    id: string,
    owner?: string | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type CreateTransactionMutationVariables = {
  condition?: ModelTransactionConditionInput | null,
  input: CreateTransactionInput,
};

export type CreateTransactionMutation = {
  createTransaction?:  {
    __typename: "Transaction",
    accountId: string,
    amount: number,
    category: string,
    createdAt: number,
    id: string,
    isFraudulent: boolean,
    isProcessed: boolean,
    isUserValidated: boolean,
    latitude: number,
    longitude: number,
    owner?: string | null,
    type: string,
    updatedAt: number,
    userId: string,
    vendor: string,
  } | null,
};

export type DeleteAccountMutationVariables = {
  condition?: ModelAccountConditionInput | null,
  input: DeleteAccountInput,
};

export type DeleteAccountMutation = {
  deleteAccount?:  {
    __typename: "Account",
    accountName: string,
    balance: number,
    createdAt: string,
    id: string,
    owner?: string | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type DeleteTransactionMutationVariables = {
  condition?: ModelTransactionConditionInput | null,
  input: DeleteTransactionInput,
};

export type DeleteTransactionMutation = {
  deleteTransaction?:  {
    __typename: "Transaction",
    accountId: string,
    amount: number,
    category: string,
    createdAt: number,
    id: string,
    isFraudulent: boolean,
    isProcessed: boolean,
    isUserValidated: boolean,
    latitude: number,
    longitude: number,
    owner?: string | null,
    type: string,
    updatedAt: number,
    userId: string,
    vendor: string,
  } | null,
};

export type UpdateAccountMutationVariables = {
  condition?: ModelAccountConditionInput | null,
  input: UpdateAccountInput,
};

export type UpdateAccountMutation = {
  updateAccount?:  {
    __typename: "Account",
    accountName: string,
    balance: number,
    createdAt: string,
    id: string,
    owner?: string | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type UpdateTransactionMutationVariables = {
  condition?: ModelTransactionConditionInput | null,
  input: UpdateTransactionInput,
};

export type UpdateTransactionMutation = {
  updateTransaction?:  {
    __typename: "Transaction",
    accountId: string,
    amount: number,
    category: string,
    createdAt: number,
    id: string,
    isFraudulent: boolean,
    isProcessed: boolean,
    isUserValidated: boolean,
    latitude: number,
    longitude: number,
    owner?: string | null,
    type: string,
    updatedAt: number,
    userId: string,
    vendor: string,
  } | null,
};

export type OnCreateAccountSubscriptionVariables = {
  filter?: ModelSubscriptionAccountFilterInput | null,
  owner?: string | null,
};

export type OnCreateAccountSubscription = {
  onCreateAccount?:  {
    __typename: "Account",
    accountName: string,
    balance: number,
    createdAt: string,
    id: string,
    owner?: string | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnCreateTransactionSubscriptionVariables = {
  filter?: ModelSubscriptionTransactionFilterInput | null,
  owner?: string | null,
};

export type OnCreateTransactionSubscription = {
  onCreateTransaction?:  {
    __typename: "Transaction",
    accountId: string,
    amount: number,
    category: string,
    createdAt: number,
    id: string,
    isFraudulent: boolean,
    isProcessed: boolean,
    isUserValidated: boolean,
    latitude: number,
    longitude: number,
    owner?: string | null,
    type: string,
    updatedAt: number,
    userId: string,
    vendor: string,
  } | null,
};

export type OnDeleteAccountSubscriptionVariables = {
  filter?: ModelSubscriptionAccountFilterInput | null,
  owner?: string | null,
};

export type OnDeleteAccountSubscription = {
  onDeleteAccount?:  {
    __typename: "Account",
    accountName: string,
    balance: number,
    createdAt: string,
    id: string,
    owner?: string | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnDeleteTransactionSubscriptionVariables = {
  filter?: ModelSubscriptionTransactionFilterInput | null,
  owner?: string | null,
};

export type OnDeleteTransactionSubscription = {
  onDeleteTransaction?:  {
    __typename: "Transaction",
    accountId: string,
    amount: number,
    category: string,
    createdAt: number,
    id: string,
    isFraudulent: boolean,
    isProcessed: boolean,
    isUserValidated: boolean,
    latitude: number,
    longitude: number,
    owner?: string | null,
    type: string,
    updatedAt: number,
    userId: string,
    vendor: string,
  } | null,
};

export type OnUpdateAccountSubscriptionVariables = {
  filter?: ModelSubscriptionAccountFilterInput | null,
  owner?: string | null,
};

export type OnUpdateAccountSubscription = {
  onUpdateAccount?:  {
    __typename: "Account",
    accountName: string,
    balance: number,
    createdAt: string,
    id: string,
    owner?: string | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnUpdateTransactionSubscriptionVariables = {
  filter?: ModelSubscriptionTransactionFilterInput | null,
  owner?: string | null,
};

export type OnUpdateTransactionSubscription = {
  onUpdateTransaction?:  {
    __typename: "Transaction",
    accountId: string,
    amount: number,
    category: string,
    createdAt: number,
    id: string,
    isFraudulent: boolean,
    isProcessed: boolean,
    isUserValidated: boolean,
    latitude: number,
    longitude: number,
    owner?: string | null,
    type: string,
    updatedAt: number,
    userId: string,
    vendor: string,
  } | null,
};
