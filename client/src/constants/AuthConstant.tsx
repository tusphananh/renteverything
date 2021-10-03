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
}

export interface AuthState {
  isFetching?: boolean;
  isAuthenticated?: boolean;
  message?: string | null;
  errors: ErrorResponse[] | [];
  user?: User | null;
}

export interface AuthAction {
  type: AuthType;
  payload?: AuthState;
}
