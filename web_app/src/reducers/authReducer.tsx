/**
 * React Reducer for Authentication
 */

import { AuthTypes, AuthAction, AuthState } from "../constants/AuthConstant";
export const AuthReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  const { type, payload } = action;
  switch (type) {
    case AuthTypes.AUTH_LOGIN_REQUESTS:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
      };
    case AuthTypes.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: payload?.user,
        errors: [],
      };
    case AuthTypes.AUTH_LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errors: payload?.errors!,
      };
    case AuthTypes.AUTH_REGISTER_REQUESTS:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
      };
    case AuthTypes.AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errors: [],
        user: payload?.user,
      };
    case AuthTypes.AUTH_REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,

        errors: payload?.errors!,
      };
    case AuthTypes.AUTH_LOGOUT_REQUESTS:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: true,
      };
    case AuthTypes.AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errors: [],
        user: null,
      };
    case AuthTypes.AUTH_LOGOUT_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errors: payload?.errors!,
      };
    case AuthTypes.AUTH_CHECK_SESSION_REQUESTS:
      return {
        ...state,
        isFetching: true,
      };
    case AuthTypes.AUTH_CHECK_SESSION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: payload?.user,
        errors: [],
      };
    case AuthTypes.AUTH_CHECK_SESSION_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errors: payload?.errors!,
      };
    case AuthTypes.AUTH_REFESH_SESSION_REQUESTS:
      return {
        ...state,
        isFetching: true,
      };

    case AuthTypes.AUTH_REFESH_SESSION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: payload?.user,
        errors: [],
      };
    case AuthTypes.AUTH_REFESH_SESSION_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errors: payload?.errors!,
      };

    default:
      return state;
  }
};
export default AuthReducer;
