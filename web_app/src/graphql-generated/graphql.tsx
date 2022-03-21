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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type ActivitiesResponse = {
  __typename?: 'ActivitiesResponse';
  code: Scalars['Float'];
  data: Array<Activity>;
  errors?: Maybe<Array<ErrorResponse>>;
  success: Scalars['Boolean'];
};

export type Activity = {
  __typename?: 'Activity';
  chat: Chat;
  createdAt: Scalars['DateTime'];
  distance: Scalars['Float'];
  duration: Scalars['Float'];
  id: Scalars['ID'];
  itemDescription: Scalars['String'];
  itemName: Scalars['String'];
  itemPrice: Scalars['Float'];
  itemRealValue: Scalars['Float'];
  name: Scalars['String'];
  provider: User;
  renter: User;
  status: Scalars['String'];
  totalPrice: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type ActivityResponse = {
  __typename?: 'ActivityResponse';
  code: Scalars['Float'];
  data: Activity;
  errors?: Maybe<Array<ErrorResponse>>;
  success: Scalars['Boolean'];
};

export type Chat = {
  __typename?: 'Chat';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  messages: Array<Message>;
  title: Scalars['String'];
};

export type ErrorResponse = {
  __typename?: 'ErrorResponse';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ImageId = {
  __typename?: 'ImageID';
  backSide: Scalars['String'];
  frontSide: Scalars['String'];
};

export type ImageIdResponse = {
  __typename?: 'ImageIDResponse';
  code: Scalars['Float'];
  data?: Maybe<ImageId>;
  errors?: Maybe<Array<ErrorResponse>>;
  success: Scalars['Boolean'];
};

export type Item = {
  __typename?: 'Item';
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  realValue: Scalars['Float'];
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

export type Message = {
  __typename?: 'Message';
  chatId: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  text: Scalars['String'];
  user: User;
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  code: Scalars['Float'];
  data?: Maybe<Message>;
  errors?: Maybe<Array<ErrorResponse>>;
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addActivity?: Maybe<ActivityResponse>;
  addItem?: Maybe<ItemResponse>;
  addMessage?: Maybe<MessageResponse>;
  deleteItem?: Maybe<ItemResponse>;
  failActivity?: Maybe<ActivityResponse>;
  register?: Maybe<UserResponse>;
  successActivity?: Maybe<ActivityResponse>;
  updateBalance?: Maybe<UserResponse>;
  updateItem?: Maybe<ItemResponse>;
  uploadIdImage?: Maybe<UserResponse>;
};


export type MutationAddActivityArgs = {
  distance: Scalars['Float'];
  duration: Scalars['Float'];
  id: Scalars['String'];
  itemDescription: Scalars['String'];
  itemName: Scalars['String'];
  itemPrice: Scalars['Float'];
  itemRealValue: Scalars['Float'];
  name: Scalars['String'];
  providerId: Scalars['String'];
  renterId: Scalars['String'];
  totalPrice: Scalars['Float'];
};


export type MutationAddItemArgs = {
  description: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  realValue: Scalars['Float'];
};


export type MutationAddMessageArgs = {
  chatId: Scalars['Float'];
  id: Scalars['String'];
  text: Scalars['String'];
};


export type MutationDeleteItemArgs = {
  id: Scalars['Float'];
};


export type MutationFailActivityArgs = {
  id: Scalars['String'];
};


export type MutationRegisterArgs = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
};


export type MutationSuccessActivityArgs = {
  id: Scalars['String'];
};


export type MutationUpdateBalanceArgs = {
  amount: Scalars['Float'];
};


export type MutationUpdateItemArgs = {
  description: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  price: Scalars['Float'];
  realValue: Scalars['Float'];
};


export type MutationUploadIdImageArgs = {
  backSide: Scalars['Upload'];
  frontSide: Scalars['Upload'];
};

export type Query = {
  __typename?: 'Query';
  checkSession?: Maybe<UserResponse>;
  getImageId?: Maybe<ImageIdResponse>;
  getItems?: Maybe<ItemsResponse>;
  getItemsByName?: Maybe<ItemsResponse>;
  getProvideActivities?: Maybe<ActivitiesResponse>;
  getRentActivities?: Maybe<ActivitiesResponse>;
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
  balance: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  items: Array<Item>;
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

export type ActivityResponseFragmentFragment = { __typename?: 'Activity', id: string, name: string, itemName: string, itemDescription: string, itemPrice: number, itemRealValue: number, totalPrice: number, duration: number, distance: number, status: string, createdAt: any, updatedAt: any, provider: { __typename?: 'User', id: string, firstName: string, lastName: string, phone: string }, renter: { __typename?: 'User', id: string, firstName: string, lastName: string, phone: string }, chat: { __typename?: 'Chat', id: string, title: string, createdAt: any, messages: Array<{ __typename?: 'Message', id: string, createdAt: any, text: string, chatId: number, user: { __typename?: 'User', id: string, firstName: string, lastName: string, phone: string } }> } };

export type ErrosResponseFragmentFragment = { __typename?: 'ErrorResponse', field: string, message: string };

export type ImageIdResponseFragmentFragment = { __typename?: 'ImageID', frontSide: string, backSide: string };

export type ItemResponseFragmentFragment = { __typename?: 'Item', id: string, name: string, description: string, price: number, realValue: number };

export type MessageResponseFragmentFragment = { __typename?: 'Message', id: string, createdAt: any, text: string, chatId: number, user: { __typename?: 'User', id: string, firstName: string, lastName: string, phone: string } };

export type UserResponseFragmentFragment = { __typename?: 'User', id: string, firstName: string, lastName: string, phone: string, balance: number, createdAt: any, updatedAt: any, items: Array<{ __typename?: 'Item', id: string, name: string, description: string, price: number, realValue: number }> };

export type AddActivityMutationVariables = Exact<{
  id: Scalars['String'];
  name: Scalars['String'];
  itemName: Scalars['String'];
  itemDescription: Scalars['String'];
  itemPrice: Scalars['Float'];
  itemRealValue: Scalars['Float'];
  totalPrice: Scalars['Float'];
  duration: Scalars['Float'];
  distance: Scalars['Float'];
  providerId: Scalars['String'];
  renterId: Scalars['String'];
}>;


export type AddActivityMutation = { __typename?: 'Mutation', addActivity?: Maybe<{ __typename?: 'ActivityResponse', code: number, success: boolean, errors?: Maybe<Array<{ __typename?: 'ErrorResponse', field: string, message: string }>>, data: { __typename?: 'Activity', id: string, name: string, itemName: string, itemDescription: string, itemPrice: number, itemRealValue: number, totalPrice: number, duration: number, distance: number, status: string, createdAt: any, updatedAt: any, provider: { __typename?: 'User', id: string, firstName: string, lastName: string, phone: string }, renter: { __typename?: 'User', id: string, firstName: string, lastName: string, phone: string }, chat: { __typename?: 'Chat', id: string, title: string, createdAt: any, messages: Array<{ __typename?: 'Message', id: string, createdAt: any, text: string, chatId: number, user: { __typename?: 'User', id: string, firstName: string, lastName: string, phone: string } }> } } }> };

export type FailActivityMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type FailActivityMutation = { __typename?: 'Mutation', failActivity?: Maybe<{ __typename?: 'ActivityResponse', code: number, success: boolean, errors?: Maybe<Array<{ __typename?: 'ErrorResponse', field: string, message: string }>>, data: { __typename?: 'Activity', id: string, name: string, itemName: string, itemDescription: string, itemPrice: number, itemRealValue: number, totalPrice: number, duration: number, distance: number, status: string, createdAt: any, updatedAt: any, provider: { __typename?: 'User', id: string, firstName: string, lastName: string, phone: string }, renter: { __typename?: 'User', id: string, firstName: string, lastName: string, phone: string }, chat: { __typename?: 'Chat', id: string, title: string, createdAt: any, messages: Array<{ __typename?: 'Message', id: string, createdAt: any, text: string, chatId: number, user: { __typename?: 'User', id: string, firstName: string, lastName: string, phone: string } }> } } }> };

export type SuccessActivityMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type SuccessActivityMutation = { __typename?: 'Mutation', successActivity?: Maybe<{ __typename?: 'ActivityResponse', code: number, success: boolean, errors?: Maybe<Array<{ __typename?: 'ErrorResponse', field: string, message: string }>>, data: { __typename?: 'Activity', id: string, name: string, itemName: string, itemDescription: string, itemPrice: number, itemRealValue: number, totalPrice: number, duration: number, distance: number, status: string, createdAt: any, updatedAt: any, provider: { __typename?: 'User', id: string, firstName: string, lastName: string, phone: string }, renter: { __typename?: 'User', id: string, firstName: string, lastName: string, phone: string }, chat: { __typename?: 'Chat', id: string, title: string, createdAt: any, messages: Array<{ __typename?: 'Message', id: string, createdAt: any, text: string, chatId: number, user: { __typename?: 'User', id: string, firstName: string, lastName: string, phone: string } }> } } }> };

export type AddMessageMutationVariables = Exact<{
  id: Scalars['String'];
  chatId: Scalars['Float'];
  text: Scalars['String'];
}>;


export type AddMessageMutation = { __typename?: 'Mutation', addMessage?: Maybe<{ __typename?: 'MessageResponse', code: number, success: boolean, errors?: Maybe<Array<{ __typename?: 'ErrorResponse', field: string, message: string }>>, data?: Maybe<{ __typename?: 'Message', id: string, createdAt: any, text: string, chatId: number, user: { __typename?: 'User', id: string, firstName: string, lastName: string, phone: string } }> }> };

export type AddItemMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
  realValue: Scalars['Float'];
}>;


export type AddItemMutation = { __typename?: 'Mutation', addItem?: Maybe<{ __typename?: 'ItemResponse', code: number, success: boolean, errors?: Maybe<Array<{ __typename?: 'ErrorResponse', field: string, message: string }>>, data?: Maybe<{ __typename?: 'Item', id: string, name: string, description: string, price: number, realValue: number }> }> };

export type UpdateItemMutationVariables = Exact<{
  id: Scalars['Float'];
  name: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
  realValue: Scalars['Float'];
}>;


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem?: Maybe<{ __typename?: 'ItemResponse', code: number, success: boolean, errors?: Maybe<Array<{ __typename?: 'ErrorResponse', field: string, message: string }>>, data?: Maybe<{ __typename?: 'Item', id: string, name: string, description: string, price: number, realValue: number }> }> };

export type DeleteItemMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteItemMutation = { __typename?: 'Mutation', deleteItem?: Maybe<{ __typename?: 'ItemResponse', code: number, success: boolean, errors?: Maybe<Array<{ __typename?: 'ErrorResponse', field: string, message: string }>>, data?: Maybe<{ __typename?: 'Item', id: string, name: string, description: string, price: number, realValue: number }> }> };

export type RegisterMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: Maybe<{ __typename?: 'UserResponse', code: number, success: boolean, errors?: Maybe<Array<{ __typename?: 'ErrorResponse', field: string, message: string }>>, data?: Maybe<{ __typename?: 'User', id: string, firstName: string, lastName: string, phone: string, balance: number, createdAt: any, updatedAt: any, items: Array<{ __typename?: 'Item', id: string, name: string, description: string, price: number, realValue: number }> }> }> };

export type UploadIdImageMutationVariables = Exact<{
  frontSide: Scalars['Upload'];
  backSide: Scalars['Upload'];
}>;


export type UploadIdImageMutation = { __typename?: 'Mutation', uploadIdImage?: Maybe<{ __typename?: 'UserResponse', code: number, success: boolean, errors?: Maybe<Array<{ __typename?: 'ErrorResponse', field: string, message: string }>>, data?: Maybe<{ __typename?: 'User', id: string, firstName: string, lastName: string, phone: string, balance: number, createdAt: any, updatedAt: any, items: Array<{ __typename?: 'Item', id: string, name: string, description: string, price: number, realValue: number }> }> }> };

export type GetRentActivitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRentActivitiesQuery = { __typename?: 'Query', getRentActivities?: Maybe<{ __typename?: 'ActivitiesResponse', code: number, success: boolean, errors?: Maybe<Array<{ __typename?: 'ErrorResponse', field: string, message: string }>>, data: Array<{ __typename?: 'Activity', id: string, name: string, itemName: string, itemDescription: string, itemPrice: number, itemRealValue: number, totalPrice: number, duration: number, distance: number, status: string, createdAt: any, updatedAt: any, provider: { __typename?: 'User', id: string, firstName: string, lastName: string, phone: string }, renter: { __typename?: 'User', id: string, firstName: string, lastName: string, phone: string }, chat: { __typename?: 'Chat', id: string, title: string, createdAt: any, messages: Array<{ __typename?: 'Message', id: string, createdAt: any, text: string, chatId: number, user: { __typename?: 'User', id: string, firstName: string, lastName: string, phone: string } }> } }> }> };

export type GetProvideActivitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProvideActivitiesQuery = { __typename?: 'Query', getProvideActivities?: Maybe<{ __typename?: 'ActivitiesResponse', code: number, success: boolean, errors?: Maybe<Array<{ __typename?: 'ErrorResponse', field: string, message: string }>>, data: Array<{ __typename?: 'Activity', id: string, name: string, itemName: string, itemDescription: string, itemPrice: number, itemRealValue: number, totalPrice: number, duration: number, distance: number, status: string, createdAt: any, updatedAt: any, provider: { __typename?: 'User', id: string, firstName: string, lastName: string, phone: string }, renter: { __typename?: 'User', id: string, firstName: string, lastName: string, phone: string }, chat: { __typename?: 'Chat', id: string, title: string, createdAt: any, messages: Array<{ __typename?: 'Message', id: string, createdAt: any, text: string, chatId: number, user: { __typename?: 'User', id: string, firstName: string, lastName: string, phone: string } }> } }> }> };

export type GetImageIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetImageIdQuery = { __typename?: 'Query', getImageId?: Maybe<{ __typename?: 'ImageIDResponse', code: number, success: boolean, errors?: Maybe<Array<{ __typename?: 'ErrorResponse', field: string, message: string }>>, data?: Maybe<{ __typename?: 'ImageID', frontSide: string, backSide: string }> }> };

export type LoginQueryVariables = Exact<{
  phone: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginQuery = { __typename?: 'Query', login?: Maybe<{ __typename?: 'UserResponse', code: number, success: boolean, errors?: Maybe<Array<{ __typename?: 'ErrorResponse', field: string, message: string }>>, data?: Maybe<{ __typename?: 'User', id: string, firstName: string, lastName: string, phone: string, balance: number, createdAt: any, updatedAt: any, items: Array<{ __typename?: 'Item', id: string, name: string, description: string, price: number, realValue: number }> }> }> };

export type CheckSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckSessionQuery = { __typename?: 'Query', checkSession?: Maybe<{ __typename?: 'UserResponse', code: number, success: boolean, errors?: Maybe<Array<{ __typename?: 'ErrorResponse', field: string, message: string }>>, data?: Maybe<{ __typename?: 'User', id: string, firstName: string, lastName: string, phone: string, balance: number, createdAt: any, updatedAt: any, items: Array<{ __typename?: 'Item', id: string, name: string, description: string, price: number, realValue: number }> }> }> };

export type RefreshSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type RefreshSessionQuery = { __typename?: 'Query', refreshSession?: Maybe<{ __typename?: 'UserResponse', code: number, success: boolean, errors?: Maybe<Array<{ __typename?: 'ErrorResponse', field: string, message: string }>>, data?: Maybe<{ __typename?: 'User', id: string, firstName: string, lastName: string, phone: string, balance: number, createdAt: any, updatedAt: any, items: Array<{ __typename?: 'Item', id: string, name: string, description: string, price: number, realValue: number }> }> }> };

export const MessageResponseFragmentFragmentDoc = gql`
    fragment MessageResponseFragment on Message {
  id
  createdAt
  text
  chatId
  user {
    id
    firstName
    lastName
    phone
  }
}
    `;
export const ActivityResponseFragmentFragmentDoc = gql`
    fragment ActivityResponseFragment on Activity {
  id
  name
  itemName
  itemDescription
  itemPrice
  itemRealValue
  totalPrice
  duration
  distance
  status
  createdAt
  updatedAt
  provider {
    id
    firstName
    lastName
    phone
  }
  renter {
    id
    firstName
    lastName
    phone
  }
  chat {
    id
    title
    createdAt
    messages {
      ...MessageResponseFragment
    }
  }
}
    ${MessageResponseFragmentFragmentDoc}`;
export const ErrosResponseFragmentFragmentDoc = gql`
    fragment ErrosResponseFragment on ErrorResponse {
  field
  message
}
    `;
export const ImageIdResponseFragmentFragmentDoc = gql`
    fragment ImageIDResponseFragment on ImageID {
  frontSide
  backSide
}
    `;
export const ItemResponseFragmentFragmentDoc = gql`
    fragment ItemResponseFragment on Item {
  id
  name
  description
  price
  realValue
}
    `;
export const UserResponseFragmentFragmentDoc = gql`
    fragment UserResponseFragment on User {
  id
  firstName
  lastName
  phone
  balance
  createdAt
  updatedAt
  items {
    ...ItemResponseFragment
  }
}
    ${ItemResponseFragmentFragmentDoc}`;
export const AddActivityDocument = gql`
    mutation addActivity($id: String!, $name: String!, $itemName: String!, $itemDescription: String!, $itemPrice: Float!, $itemRealValue: Float!, $totalPrice: Float!, $duration: Float!, $distance: Float!, $providerId: String!, $renterId: String!) {
  addActivity(
    id: $id
    name: $name
    itemName: $itemName
    itemDescription: $itemDescription
    itemPrice: $itemPrice
    itemRealValue: $itemRealValue
    totalPrice: $totalPrice
    duration: $duration
    distance: $distance
    providerId: $providerId
    renterId: $renterId
  ) {
    code
    success
    errors {
      ...ErrosResponseFragment
    }
    data {
      ...ActivityResponseFragment
    }
  }
}
    ${ErrosResponseFragmentFragmentDoc}
${ActivityResponseFragmentFragmentDoc}`;
export type AddActivityMutationFn = Apollo.MutationFunction<AddActivityMutation, AddActivityMutationVariables>;

/**
 * __useAddActivityMutation__
 *
 * To run a mutation, you first call `useAddActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addActivityMutation, { data, loading, error }] = useAddActivityMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      itemName: // value for 'itemName'
 *      itemDescription: // value for 'itemDescription'
 *      itemPrice: // value for 'itemPrice'
 *      itemRealValue: // value for 'itemRealValue'
 *      totalPrice: // value for 'totalPrice'
 *      duration: // value for 'duration'
 *      distance: // value for 'distance'
 *      providerId: // value for 'providerId'
 *      renterId: // value for 'renterId'
 *   },
 * });
 */
export function useAddActivityMutation(baseOptions?: Apollo.MutationHookOptions<AddActivityMutation, AddActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddActivityMutation, AddActivityMutationVariables>(AddActivityDocument, options);
      }
export type AddActivityMutationHookResult = ReturnType<typeof useAddActivityMutation>;
export type AddActivityMutationResult = Apollo.MutationResult<AddActivityMutation>;
export type AddActivityMutationOptions = Apollo.BaseMutationOptions<AddActivityMutation, AddActivityMutationVariables>;
export const FailActivityDocument = gql`
    mutation failActivity($id: String!) {
  failActivity(id: $id) {
    code
    success
    errors {
      ...ErrosResponseFragment
    }
    data {
      ...ActivityResponseFragment
    }
  }
}
    ${ErrosResponseFragmentFragmentDoc}
${ActivityResponseFragmentFragmentDoc}`;
export type FailActivityMutationFn = Apollo.MutationFunction<FailActivityMutation, FailActivityMutationVariables>;

/**
 * __useFailActivityMutation__
 *
 * To run a mutation, you first call `useFailActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFailActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [failActivityMutation, { data, loading, error }] = useFailActivityMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFailActivityMutation(baseOptions?: Apollo.MutationHookOptions<FailActivityMutation, FailActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FailActivityMutation, FailActivityMutationVariables>(FailActivityDocument, options);
      }
export type FailActivityMutationHookResult = ReturnType<typeof useFailActivityMutation>;
export type FailActivityMutationResult = Apollo.MutationResult<FailActivityMutation>;
export type FailActivityMutationOptions = Apollo.BaseMutationOptions<FailActivityMutation, FailActivityMutationVariables>;
export const SuccessActivityDocument = gql`
    mutation successActivity($id: String!) {
  successActivity(id: $id) {
    code
    success
    errors {
      ...ErrosResponseFragment
    }
    data {
      ...ActivityResponseFragment
    }
  }
}
    ${ErrosResponseFragmentFragmentDoc}
${ActivityResponseFragmentFragmentDoc}`;
export type SuccessActivityMutationFn = Apollo.MutationFunction<SuccessActivityMutation, SuccessActivityMutationVariables>;

/**
 * __useSuccessActivityMutation__
 *
 * To run a mutation, you first call `useSuccessActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSuccessActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [successActivityMutation, { data, loading, error }] = useSuccessActivityMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSuccessActivityMutation(baseOptions?: Apollo.MutationHookOptions<SuccessActivityMutation, SuccessActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SuccessActivityMutation, SuccessActivityMutationVariables>(SuccessActivityDocument, options);
      }
export type SuccessActivityMutationHookResult = ReturnType<typeof useSuccessActivityMutation>;
export type SuccessActivityMutationResult = Apollo.MutationResult<SuccessActivityMutation>;
export type SuccessActivityMutationOptions = Apollo.BaseMutationOptions<SuccessActivityMutation, SuccessActivityMutationVariables>;
export const AddMessageDocument = gql`
    mutation addMessage($id: String!, $chatId: Float!, $text: String!) {
  addMessage(id: $id, chatId: $chatId, text: $text) {
    code
    success
    errors {
      ...ErrosResponseFragment
    }
    data {
      ...MessageResponseFragment
    }
  }
}
    ${ErrosResponseFragmentFragmentDoc}
${MessageResponseFragmentFragmentDoc}`;
export type AddMessageMutationFn = Apollo.MutationFunction<AddMessageMutation, AddMessageMutationVariables>;

/**
 * __useAddMessageMutation__
 *
 * To run a mutation, you first call `useAddMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMessageMutation, { data, loading, error }] = useAddMessageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      chatId: // value for 'chatId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useAddMessageMutation(baseOptions?: Apollo.MutationHookOptions<AddMessageMutation, AddMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMessageMutation, AddMessageMutationVariables>(AddMessageDocument, options);
      }
export type AddMessageMutationHookResult = ReturnType<typeof useAddMessageMutation>;
export type AddMessageMutationResult = Apollo.MutationResult<AddMessageMutation>;
export type AddMessageMutationOptions = Apollo.BaseMutationOptions<AddMessageMutation, AddMessageMutationVariables>;
export const AddItemDocument = gql`
    mutation addItem($name: String!, $description: String!, $price: Float!, $realValue: Float!) {
  addItem(
    name: $name
    description: $description
    price: $price
    realValue: $realValue
  ) {
    code
    success
    errors {
      ...ErrosResponseFragment
    }
    data {
      ...ItemResponseFragment
    }
  }
}
    ${ErrosResponseFragmentFragmentDoc}
${ItemResponseFragmentFragmentDoc}`;
export type AddItemMutationFn = Apollo.MutationFunction<AddItemMutation, AddItemMutationVariables>;

/**
 * __useAddItemMutation__
 *
 * To run a mutation, you first call `useAddItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addItemMutation, { data, loading, error }] = useAddItemMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      price: // value for 'price'
 *      realValue: // value for 'realValue'
 *   },
 * });
 */
export function useAddItemMutation(baseOptions?: Apollo.MutationHookOptions<AddItemMutation, AddItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddItemMutation, AddItemMutationVariables>(AddItemDocument, options);
      }
export type AddItemMutationHookResult = ReturnType<typeof useAddItemMutation>;
export type AddItemMutationResult = Apollo.MutationResult<AddItemMutation>;
export type AddItemMutationOptions = Apollo.BaseMutationOptions<AddItemMutation, AddItemMutationVariables>;
export const UpdateItemDocument = gql`
    mutation updateItem($id: Float!, $name: String!, $description: String!, $price: Float!, $realValue: Float!) {
  updateItem(
    id: $id
    name: $name
    description: $description
    price: $price
    realValue: $realValue
  ) {
    code
    success
    errors {
      ...ErrosResponseFragment
    }
    data {
      ...ItemResponseFragment
    }
  }
}
    ${ErrosResponseFragmentFragmentDoc}
${ItemResponseFragmentFragmentDoc}`;
export type UpdateItemMutationFn = Apollo.MutationFunction<UpdateItemMutation, UpdateItemMutationVariables>;

/**
 * __useUpdateItemMutation__
 *
 * To run a mutation, you first call `useUpdateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateItemMutation, { data, loading, error }] = useUpdateItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      price: // value for 'price'
 *      realValue: // value for 'realValue'
 *   },
 * });
 */
export function useUpdateItemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateItemMutation, UpdateItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateItemMutation, UpdateItemMutationVariables>(UpdateItemDocument, options);
      }
export type UpdateItemMutationHookResult = ReturnType<typeof useUpdateItemMutation>;
export type UpdateItemMutationResult = Apollo.MutationResult<UpdateItemMutation>;
export type UpdateItemMutationOptions = Apollo.BaseMutationOptions<UpdateItemMutation, UpdateItemMutationVariables>;
export const DeleteItemDocument = gql`
    mutation deleteItem($id: Float!) {
  deleteItem(id: $id) {
    code
    success
    errors {
      ...ErrosResponseFragment
    }
    data {
      ...ItemResponseFragment
    }
  }
}
    ${ErrosResponseFragmentFragmentDoc}
${ItemResponseFragmentFragmentDoc}`;
export type DeleteItemMutationFn = Apollo.MutationFunction<DeleteItemMutation, DeleteItemMutationVariables>;

/**
 * __useDeleteItemMutation__
 *
 * To run a mutation, you first call `useDeleteItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteItemMutation, { data, loading, error }] = useDeleteItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteItemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteItemMutation, DeleteItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteItemMutation, DeleteItemMutationVariables>(DeleteItemDocument, options);
      }
export type DeleteItemMutationHookResult = ReturnType<typeof useDeleteItemMutation>;
export type DeleteItemMutationResult = Apollo.MutationResult<DeleteItemMutation>;
export type DeleteItemMutationOptions = Apollo.BaseMutationOptions<DeleteItemMutation, DeleteItemMutationVariables>;
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
export const UploadIdImageDocument = gql`
    mutation UploadIdImage($frontSide: Upload!, $backSide: Upload!) {
  uploadIdImage(frontSide: $frontSide, backSide: $backSide) {
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
export type UploadIdImageMutationFn = Apollo.MutationFunction<UploadIdImageMutation, UploadIdImageMutationVariables>;

/**
 * __useUploadIdImageMutation__
 *
 * To run a mutation, you first call `useUploadIdImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadIdImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadIdImageMutation, { data, loading, error }] = useUploadIdImageMutation({
 *   variables: {
 *      frontSide: // value for 'frontSide'
 *      backSide: // value for 'backSide'
 *   },
 * });
 */
export function useUploadIdImageMutation(baseOptions?: Apollo.MutationHookOptions<UploadIdImageMutation, UploadIdImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadIdImageMutation, UploadIdImageMutationVariables>(UploadIdImageDocument, options);
      }
export type UploadIdImageMutationHookResult = ReturnType<typeof useUploadIdImageMutation>;
export type UploadIdImageMutationResult = Apollo.MutationResult<UploadIdImageMutation>;
export type UploadIdImageMutationOptions = Apollo.BaseMutationOptions<UploadIdImageMutation, UploadIdImageMutationVariables>;
export const GetRentActivitiesDocument = gql`
    query getRentActivities {
  getRentActivities {
    code
    success
    errors {
      ...ErrosResponseFragment
    }
    data {
      ...ActivityResponseFragment
    }
  }
}
    ${ErrosResponseFragmentFragmentDoc}
${ActivityResponseFragmentFragmentDoc}`;

/**
 * __useGetRentActivitiesQuery__
 *
 * To run a query within a React component, call `useGetRentActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRentActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRentActivitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRentActivitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetRentActivitiesQuery, GetRentActivitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRentActivitiesQuery, GetRentActivitiesQueryVariables>(GetRentActivitiesDocument, options);
      }
export function useGetRentActivitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRentActivitiesQuery, GetRentActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRentActivitiesQuery, GetRentActivitiesQueryVariables>(GetRentActivitiesDocument, options);
        }
export type GetRentActivitiesQueryHookResult = ReturnType<typeof useGetRentActivitiesQuery>;
export type GetRentActivitiesLazyQueryHookResult = ReturnType<typeof useGetRentActivitiesLazyQuery>;
export type GetRentActivitiesQueryResult = Apollo.QueryResult<GetRentActivitiesQuery, GetRentActivitiesQueryVariables>;
export const GetProvideActivitiesDocument = gql`
    query getProvideActivities {
  getProvideActivities {
    code
    success
    errors {
      ...ErrosResponseFragment
    }
    data {
      ...ActivityResponseFragment
    }
  }
}
    ${ErrosResponseFragmentFragmentDoc}
${ActivityResponseFragmentFragmentDoc}`;

/**
 * __useGetProvideActivitiesQuery__
 *
 * To run a query within a React component, call `useGetProvideActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProvideActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProvideActivitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProvideActivitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetProvideActivitiesQuery, GetProvideActivitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProvideActivitiesQuery, GetProvideActivitiesQueryVariables>(GetProvideActivitiesDocument, options);
      }
export function useGetProvideActivitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProvideActivitiesQuery, GetProvideActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProvideActivitiesQuery, GetProvideActivitiesQueryVariables>(GetProvideActivitiesDocument, options);
        }
export type GetProvideActivitiesQueryHookResult = ReturnType<typeof useGetProvideActivitiesQuery>;
export type GetProvideActivitiesLazyQueryHookResult = ReturnType<typeof useGetProvideActivitiesLazyQuery>;
export type GetProvideActivitiesQueryResult = Apollo.QueryResult<GetProvideActivitiesQuery, GetProvideActivitiesQueryVariables>;
export const GetImageIdDocument = gql`
    query GetImageID {
  getImageId {
    code
    success
    errors {
      ...ErrosResponseFragment
    }
    data {
      ...ImageIDResponseFragment
    }
  }
}
    ${ErrosResponseFragmentFragmentDoc}
${ImageIdResponseFragmentFragmentDoc}`;

/**
 * __useGetImageIdQuery__
 *
 * To run a query within a React component, call `useGetImageIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetImageIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetImageIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetImageIdQuery(baseOptions?: Apollo.QueryHookOptions<GetImageIdQuery, GetImageIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetImageIdQuery, GetImageIdQueryVariables>(GetImageIdDocument, options);
      }
export function useGetImageIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetImageIdQuery, GetImageIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetImageIdQuery, GetImageIdQueryVariables>(GetImageIdDocument, options);
        }
export type GetImageIdQueryHookResult = ReturnType<typeof useGetImageIdQuery>;
export type GetImageIdLazyQueryHookResult = ReturnType<typeof useGetImageIdLazyQuery>;
export type GetImageIdQueryResult = Apollo.QueryResult<GetImageIdQuery, GetImageIdQueryVariables>;
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