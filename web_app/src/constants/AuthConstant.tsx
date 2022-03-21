import { ErrorResponse } from '../graphql-generated/graphql'
import { ItemMaybe } from './ItemsConstants'

export enum AuthTypes {
  AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS',
  AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE',
  AUTH_LOGIN_REQUESTS = 'AUTH_LOGIN_REQUESTS',
  AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS',
  AUTH_REGISTER_FAILURE = 'AUTH_REGISTER_FAILURE',
  AUTH_REGISTER_REQUESTS = 'AUTH_REGISTER_REQUESTS',
  AUTH_CHECK_SESSION_REQUESTS = 'AUTH_CHECK_SESSION_REQUESTS',
  AUTH_CHECK_SESSION_SUCCESS = 'AUTH_CHECK_SESSION_SUCCESS',
  AUTH_CHECK_SESSION_FAILURE = 'AUTH_CHECK_SESSION_FAILURE',
  ADD_ITEM = 'ADD_ITEM',
  ADD_ITEMS = 'ADD_ITEMS',
}

export type UserMaybe = {
  __typename?: 'User'
  id: string
  firstName: string
  lastName: string
  phone: string
  balance: number
  createdAt: any
  updatedAt: any
  items: Array<{
    __typename?: 'Item'
    id: string
    name: string
    description: string
    price: number
    realValue: number
  }>
}
export interface AuthLoginSuccessAction {
  type: AuthTypes.AUTH_LOGIN_SUCCESS
  payload: {
    user: UserMaybe
  }
}

export interface AuthLoginFailureAction {
  type: AuthTypes.AUTH_LOGIN_FAILURE
  payload: {
    errors: ErrorResponse[] | []
  }
}

export interface AuthRequestLoginAction {
  type: AuthTypes.AUTH_LOGIN_REQUESTS
}

export interface AuthRegisterRequestsAction {
  type: AuthTypes.AUTH_REGISTER_REQUESTS
}

export interface AuthRegisterSuccessAction {
  type: AuthTypes.AUTH_REGISTER_SUCCESS
  payload: {
    user: UserMaybe
  }
}

export interface AuthRegisterFailureAction {
  type: AuthTypes.AUTH_REGISTER_FAILURE
  payload: {
    errors: ErrorResponse[] | []
  }
}

export interface AuthCheckSessionSuccessAction {
  type: AuthTypes.AUTH_CHECK_SESSION_SUCCESS
  payload: {
    user: UserMaybe
  }
}

export interface AuthCheckSessionFailureAction {
  type: AuthTypes.AUTH_CHECK_SESSION_FAILURE
  payload: {
    errors: ErrorResponse[] | []
  }
}

export interface AuthCheckSessionRequestsAction {
  type: AuthTypes.AUTH_CHECK_SESSION_REQUESTS
}

export interface AuthState {
  isFetching?: boolean
  isAuthenticated?: boolean
  message?: string | null
  errors?: ErrorResponse[] | [] | null
  user?: UserMaybe | null
}

export interface AddItemAction {
  type: AuthTypes.ADD_ITEM
  payload: {
    item: ItemMaybe
  }
}
export interface AddItemsAction {
  type: AuthTypes.ADD_ITEMS
  payload: {
    items: ItemMaybe[] | []
  }
}
export type AuthAction =
  | AuthLoginSuccessAction
  | AuthLoginFailureAction
  | AuthRequestLoginAction
  | AuthRegisterRequestsAction
  | AuthRegisterSuccessAction
  | AuthRegisterFailureAction
  | AuthCheckSessionSuccessAction
  | AuthCheckSessionFailureAction
  | AuthCheckSessionRequestsAction
  | AddItemAction
  | AddItemsAction
