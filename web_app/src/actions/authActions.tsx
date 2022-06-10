import {
  UpdateBalanceAction,
  AddItemAction,
  AddItemsAction,
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
  DeleteItemAction,
  LogoutAction,
  UserMaybe,
} from "../constants/AuthConstant";
import { ItemMaybe } from "../constants/ItemsConstants";
import { UserResponse } from "../graphql-generated/graphql";

export const requestLogin = (): AuthRequestLoginAction => ({
  type: AuthTypes.AUTH_LOGIN_REQUESTS,
});

export const loginSuccess = (user: UserMaybe): AuthLoginSuccessAction => ({
  type: AuthTypes.AUTH_LOGIN_SUCCESS,
  payload: {
    user: user,
  },
});

export const loginFailure = (
  errors: UserResponse["errors"]
): AuthLoginFailureAction => ({
  type: AuthTypes.AUTH_LOGIN_FAILURE,
  payload: {
    errors: errors || [],
  },
});

export const requestRegister = (): AuthRegisterRequestsAction => ({
  type: AuthTypes.AUTH_REGISTER_REQUESTS,
});

export const registerSuccess = (
  user: UserMaybe
): AuthRegisterSuccessAction => ({
  type: AuthTypes.AUTH_REGISTER_SUCCESS,
  payload: {
    user: user,
  },
});

export const registerFailure = (
  errors: UserResponse["errors"]
): AuthRegisterFailureAction => ({
  type: AuthTypes.AUTH_REGISTER_FAILURE,
  payload: {
    errors: errors || [],
  },
});

export const requestCheckSession = (): AuthCheckSessionRequestsAction => ({
  type: AuthTypes.AUTH_CHECK_SESSION_REQUESTS,
});

export const checkSessionSuccess = (
  user: UserMaybe
): AuthCheckSessionSuccessAction => ({
  type: AuthTypes.AUTH_CHECK_SESSION_SUCCESS,
  payload: {
    user: user,
  },
});

export const checkSessionFailure = (): AuthCheckSessionFailureAction => ({
  type: AuthTypes.AUTH_CHECK_SESSION_FAILURE,
  payload: {
    errors: [],
  },
});

export const addItemAction = (item: ItemMaybe): AddItemAction => ({
  type: AuthTypes.ADD_ITEM,
  payload: {
    item,
  },
});

export const addItemsAction = (items: ItemMaybe[]): AddItemsAction => ({
  type: AuthTypes.ADD_ITEMS,
  payload: {
    items,
  },
});

export const deleteItemAction = (item: ItemMaybe): DeleteItemAction => ({
  type: AuthTypes.DELETE_ITEM,
  payload: {
    item,
  },
});

export const logoutAction = (): LogoutAction => ({
  type: AuthTypes.LOGOUT,
});

export const updateBalanceAction = (balance: number): UpdateBalanceAction => ({
  type: AuthTypes.UPDATE_BALANCE,
  payload: {
    balance,
  },
});
