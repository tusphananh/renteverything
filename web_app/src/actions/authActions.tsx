import {
  AuthCheckSessionFailureAction,
  AuthCheckSessionRequestsAction,
  AuthCheckSessionSuccessAction,
  AuthLoginFailureAction,
  AuthLoginSuccessAction,
  AuthRegisterFailureAction,
  AuthRegisterRequestsAction,
  AuthRegisterSuccessAction,
  AuthRequestLoginAction,
  AuthTypes,
} from '../constants/AuthConstant'
import { UserResponse } from '../graphql-generated/graphql'

export const requestLogin = (): AuthRequestLoginAction => ({
  type: AuthTypes.AUTH_LOGIN_REQUESTS,
})

export const loginSuccess = (
  response?: UserResponse,
): AuthLoginSuccessAction => ({
  type: AuthTypes.AUTH_LOGIN_SUCCESS,
  payload: {
    user: response?.data!,
  },
})

export const loginFailure = (
  response: UserResponse,
): AuthLoginFailureAction => ({
  type: AuthTypes.AUTH_LOGIN_FAILURE,
  payload: {
    errors: response.errors || [],
  },
})

export const requestRegister = (): AuthRegisterRequestsAction => ({
  type: AuthTypes.AUTH_REGISTER_REQUESTS,
})

export const registerSuccess = (
  response: UserResponse,
): AuthRegisterSuccessAction => ({
  type: AuthTypes.AUTH_REGISTER_SUCCESS,
  payload: {
    user: response.data!,
  },
})

export const registerFailure = (
  response: UserResponse,
): AuthRegisterFailureAction => ({
  type: AuthTypes.AUTH_REGISTER_FAILURE,
  payload: {
    errors: response.errors || [],
  },
})

export const requestCheckSession = (): AuthCheckSessionRequestsAction => ({
  type: AuthTypes.AUTH_CHECK_SESSION_REQUESTS,
})

export const checkSessionSuccess = (
  response: UserResponse,
): AuthCheckSessionSuccessAction => ({
  type: AuthTypes.AUTH_CHECK_SESSION_SUCCESS,
  payload: {
    user: response.data!,
  },
})

export const checkSessionFailure = (): AuthCheckSessionFailureAction => ({
  type: AuthTypes.AUTH_CHECK_SESSION_FAILURE,
  payload: {
    errors: [],
  },
})
