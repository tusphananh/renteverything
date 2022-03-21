/**
 * React Reducer for Authentication
 */

import { AuthAction, AuthState, AuthTypes } from '../constants/AuthConstant'
export const AuthReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case AuthTypes.AUTH_LOGIN_REQUESTS:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
      }
    case AuthTypes.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: action.payload?.user,
        errors: [],
      }
    case AuthTypes.AUTH_LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errors: action.payload?.errors!,
      }
    case AuthTypes.AUTH_REGISTER_REQUESTS:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
      }
    case AuthTypes.AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errors: [],
        user: action.payload?.user,
      }
    case AuthTypes.AUTH_REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,

        errors: action.payload?.errors!,
      }

    case AuthTypes.AUTH_CHECK_SESSION_REQUESTS:
      return {
        ...state,
        isFetching: true,
      }
    case AuthTypes.AUTH_CHECK_SESSION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: action.payload?.user,
        errors: [],
      }
    case AuthTypes.AUTH_CHECK_SESSION_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errors: action.payload?.errors!,
      }
    case AuthTypes.ADD_ITEM:
      return {
        ...state,
        isFetching: false,
        user: {
          ...state.user!,
          items: [...state.user!.items, action.payload.item],
        },
      }
    case AuthTypes.ADD_ITEMS:
      return {
        ...state,
        isFetching: false,
        user: {
          ...state.user!,
          items: [...state.user!.items, ...action.payload.items],
        },
      }

    default:
      return state
  }
}
export default AuthReducer
