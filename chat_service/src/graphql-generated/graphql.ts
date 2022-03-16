
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type ErrorResponse = {
  __typename?: 'ErrorResponse';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Item = {
  __typename?: 'Item';
  description: Scalars['String'];
  id: Scalars['ID'];
  imageUrl?: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  realValue: Scalars['Float'];
  userId: Scalars['ID'];
};

export type ItemResponse = {
  __typename?: 'ItemResponse';
  code: Scalars['Float'];
  data?: Maybe<Item>;
  errors?: Maybe<Array<ErrorResponse>>;
  success: Scalars['Boolean'];
};

export type ItemsResponse = {
  __typename?: 'ItemsResponse';
  code: Scalars['Float'];
  data: Array<Item>;
  errors?: Maybe<Array<ErrorResponse>>;
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addItem?: Maybe<ItemResponse>;
  deleteItem?: Maybe<ItemResponse>;
  register?: Maybe<UserResponse>;
  updateItem?: Maybe<ItemResponse>;
};


export type MutationAddItemArgs = {
  description: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  price: Scalars['Float'];
  realValue: Scalars['Float'];
};


export type MutationDeleteItemArgs = {
  id: Scalars['Float'];
};


export type MutationRegisterArgs = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
};


export type MutationUpdateItemArgs = {
  description?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  imageUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  realValue?: Maybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  checkSession?: Maybe<UserResponse>;
  getItems?: Maybe<ItemsResponse>;
  getItemsByName?: Maybe<ItemsResponse>;
  login?: Maybe<UserResponse>;
  logout?: Maybe<UserResponse>;
  refreshSession?: Maybe<UserResponse>;
};


export type QueryGetItemsByNameArgs = {
  name: Scalars['String'];
};


export type QueryLoginArgs = {
  password: Scalars['String'];
  phone: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  code: Scalars['Float'];
  data?: Maybe<User>;
  errors?: Maybe<Array<ErrorResponse>>;
  success: Scalars['Boolean'];
};

export type ErrosResponseFragmentFragment = { __typename?: 'ErrorResponse', field: string, message: string };

export type ItemResponseFragmentFragment = { __typename?: 'Item', id: string, name: string, description: string, price: number, imageUrl: string, userId: string, realValue: number };

export type UserResponseFragmentFragment = { __typename?: 'User', id: string, firstName: string, lastName: string, phone: string, createdAt: any, updatedAt: any };

export type RegisterMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: Maybe<{ __typename?: 'UserResponse', code: number, success: boolean, errors?: Maybe<Array<{ __typename?: 'ErrorResponse', field: string, message: string }>>, data?: Maybe<{ __typename?: 'User', id: string, firstName: string, lastName: string, phone: string, createdAt: any, updatedAt: any }> }> };

export type LoginQueryVariables = Exact<{
  phone: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginQuery = { __typename?: 'Query', login?: Maybe<{ __typename?: 'UserResponse', code: number, success: boolean, errors?: Maybe<Array<{ __typename?: 'ErrorResponse', field: string, message: string }>>, data?: Maybe<{ __typename?: 'User', id: string, firstName: string, lastName: string, phone: string, createdAt: any, updatedAt: any }> }> };

export type CheckSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckSessionQuery = { __typename?: 'Query', checkSession?: Maybe<{ __typename?: 'UserResponse', code: number, success: boolean, errors?: Maybe<Array<{ __typename?: 'ErrorResponse', field: string, message: string }>>, data?: Maybe<{ __typename?: 'User', id: string, firstName: string, lastName: string, phone: string, createdAt: any, updatedAt: any }> }> };

export type RefreshSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type RefreshSessionQuery = { __typename?: 'Query', refreshSession?: Maybe<{ __typename?: 'UserResponse', code: number, success: boolean, errors?: Maybe<Array<{ __typename?: 'ErrorResponse', field: string, message: string }>>, data?: Maybe<{ __typename?: 'User', id: string, firstName: string, lastName: string, phone: string, createdAt: any, updatedAt: any }> }> };
