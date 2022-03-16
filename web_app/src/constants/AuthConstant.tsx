import { ErrorResponse, Maybe, User } from '../graphql-generated/graphql'

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
}

export interface AuthLoginSuccessAction {
  type: AuthTypes.AUTH_LOGIN_SUCCESS
  payload: {
    user: Maybe<User>
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
    user: User
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
    user: User
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
  errors?: ErrorResponse[] | []
  user?: User | null
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
