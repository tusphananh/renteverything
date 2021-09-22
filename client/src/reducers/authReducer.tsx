/**
 * React Reducer for Authentication
 */

import { AuthType, AuthAction, AuthState } from "../constants/AuthConstant";
export const AuthReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  const { type, payload } = action;
  switch (type) {
    case AuthType.AUTH_LOGIN_REQUESTS:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        message: "New Request",
        errors: payload?.errors,
      };
    case AuthType.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errors: payload?.errors,
        message: payload?.message,
        user: payload?.user,
      };
    case AuthType.AUTH_LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errors: payload?.errors,
        message: payload?.message,
      };
    case AuthType.AUTH_REGISTER_REQUESTS:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        message: "New Request",
        errors: payload?.errors,
      };
    case AuthType.AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        message: payload?.message,
        errors: [],
        user: payload?.user,
      };
    case AuthType.AUTH_REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        message: payload?.message,
        errors: payload?.errors,
      };
    case AuthType.AUTH_LOGOUT_REQUESTS:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: true,
        message: "New Request",
        errors: payload?.errors,
      };
    case AuthType.AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        message: payload?.message,
        errors: payload?.errors,
        user: null,
      };
    case AuthType.AUTH_LOGOUT_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        message: payload?.message,
        errors: payload?.errors,
      };
    default:
      return state;
  }
};
export default AuthReducer;
