import { ErrorResponse, User } from "../graphql-generated/graphql";

export enum AuthType {
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_REQUESTS,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_LOGIN_REQUESTS,
  AUTH_REGISTER_REQUESTS,
  AUTH_CHECK_SESSION_REQUESTS,
  AUTH_CHECK_SESSION_SUCCESS,
  AUTH_CHECK_SESSION_FAILURE,
  AUTH_REFESH_SESSION_REQUESTS,
  AUTH_REFESH_SESSION_SUCCESS,
  AUTH_REFESH_SESSION_FAILURE,
}

export interface AuthState {
  isFetching?: boolean;
  isAuthenticated?: boolean;
  message?: string | null;
  errors?: ErrorResponse[] | [];
  user?: User | null;
}

export interface AuthAction {
  type: AuthType;
  payload?: AuthState;
}
