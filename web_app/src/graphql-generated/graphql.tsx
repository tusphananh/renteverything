import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  quantity: Scalars['Float'];
  userId: Scalars['Float'];
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
  quantity?: Maybe<Scalars['Float']>;
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
  quantity?: Maybe<Scalars['Float']>;
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

export type ItemResponseFragmentFragment = { __typename?: 'Item', id: string, name: string, description: string, price: number, imageUrl: string, quantity: number, userId: number };

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

export const ErrosResponseFragmentFragmentDoc = gql`
    fragment ErrosResponseFragment on ErrorResponse {
  field
  message
}
    `;
export const ItemResponseFragmentFragmentDoc = gql`
    fragment ItemResponseFragment on Item {
  id
  name
  description
  price
  imageUrl
  quantity
  userId
}
    `;
export const UserResponseFragmentFragmentDoc = gql`
    fragment UserResponseFragment on User {
  id
  firstName
  lastName
  phone
  createdAt
  updatedAt
}
    `;
export const RegisterDocument = gql`
    mutation Register($firstName: String!, $lastName: String!, $phone: String!, $password: String!) {
  register(
    firstName: $firstName
    lastName: $lastName
    phone: $phone
    password: $password
  ) {
    code
    success
    errors {
      ...ErrosResponseFragment
    }
    data {
      ...UserResponseFragment
    }
  }
}
    ${ErrosResponseFragmentFragmentDoc}
${UserResponseFragmentFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      phone: // value for 'phone'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    query Login($phone: String!, $password: String!) {
  login(phone: $phone, password: $password) {
    code
    success
    errors {
      ...ErrosResponseFragment
    }
    data {
      ...UserResponseFragment
    }
  }
}
    ${ErrosResponseFragmentFragmentDoc}
${UserResponseFragmentFragmentDoc}`;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      phone: // value for 'phone'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const CheckSessionDocument = gql`
    query CheckSession {
  checkSession {
    code
    success
    errors {
      ...ErrosResponseFragment
    }
    data {
      ...UserResponseFragment
    }
  }
}
    ${ErrosResponseFragmentFragmentDoc}
${UserResponseFragmentFragmentDoc}`;

/**
 * __useCheckSessionQuery__
 *
 * To run a query within a React component, call `useCheckSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useCheckSessionQuery(baseOptions?: Apollo.QueryHookOptions<CheckSessionQuery, CheckSessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckSessionQuery, CheckSessionQueryVariables>(CheckSessionDocument, options);
      }
export function useCheckSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckSessionQuery, CheckSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckSessionQuery, CheckSessionQueryVariables>(CheckSessionDocument, options);
        }
export type CheckSessionQueryHookResult = ReturnType<typeof useCheckSessionQuery>;
export type CheckSessionLazyQueryHookResult = ReturnType<typeof useCheckSessionLazyQuery>;
export type CheckSessionQueryResult = Apollo.QueryResult<CheckSessionQuery, CheckSessionQueryVariables>;
export const RefreshSessionDocument = gql`
    query RefreshSession {
  refreshSession {
    code
    success
    errors {
      ...ErrosResponseFragment
    }
    data {
      ...UserResponseFragment
    }
  }
}
    ${ErrosResponseFragmentFragmentDoc}
${UserResponseFragmentFragmentDoc}`;

/**
 * __useRefreshSessionQuery__
 *
 * To run a query within a React component, call `useRefreshSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useRefreshSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRefreshSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useRefreshSessionQuery(baseOptions?: Apollo.QueryHookOptions<RefreshSessionQuery, RefreshSessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RefreshSessionQuery, RefreshSessionQueryVariables>(RefreshSessionDocument, options);
      }
export function useRefreshSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RefreshSessionQuery, RefreshSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RefreshSessionQuery, RefreshSessionQueryVariables>(RefreshSessionDocument, options);
        }
export type RefreshSessionQueryHookResult = ReturnType<typeof useRefreshSessionQuery>;
export type RefreshSessionLazyQueryHookResult = ReturnType<typeof useRefreshSessionLazyQuery>;
export type RefreshSessionQueryResult = Apollo.QueryResult<RefreshSessionQuery, RefreshSessionQueryVariables>;