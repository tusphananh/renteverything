/**
 * React Reducer for Authentication
 */

import { AuthAction, AuthState, AuthTypes } from "../constants/AuthConstant";
export const AuthReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
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
        user: action.payload?.user,
        errors: [],
      };
    case AuthTypes.AUTH_LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errors: action.payload?.errors!,
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
        user: action.payload?.user,
      };
    case AuthTypes.AUTH_REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,

        errors: action.payload?.errors!,
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
        user: action.payload?.user,
        errors: [],
      };
    case AuthTypes.AUTH_CHECK_SESSION_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errors: action.payload?.errors!,
        user: null,
      };
    case AuthTypes.ADD_ITEM:
      return {
        ...state,
        isFetching: false,
        user: {
          ...state.user!,
          items: [...state.user!.items, action.payload.item],
        },
      };
    case AuthTypes.ADD_ITEMS:
      return {
        ...state,
        isFetching: false,
        user: {
          ...state.user!,
          items: [...state.user!.items, ...action.payload.items],
        },
      };
    case AuthTypes.DELETE_ITEM:
      return {
        ...state,
        isFetching: false,
        user: {
          ...state.user!,
          items: state.user!.items.filter(
            (item) => item.id !== action.payload.item.id
          ),
        },
      };
    case AuthTypes.LOGOUT:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        user: null,
        errors: [],
      };

    case AuthTypes.UPDATE_BALANCE:
      return {
        ...state,
        isFetching: false,
        user: {
          ...state.user!,
          balance: action.payload.balance,
        },
      };

    default:
      return state;
  }
};
export default AuthReducer;
