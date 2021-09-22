import { AuthAction, AuthType } from "../constants/AuthConstant";
import { ErrorResponse, User } from "../graphql-generated/graphql";

export const requestLogin = (): AuthAction => ({
    type: AuthType.AUTH_LOGIN_REQUESTS,
});

export const loginSuccess = (message: string, user: User): AuthAction => ({
    type: AuthType.AUTH_LOGIN_SUCCESS,
    payload: {
        user: user,
        message: message,
    },
});

export const loginFailure = (message: string, errors: ErrorResponse[]): AuthAction => ({
    type: AuthType.AUTH_LOGIN_FAILURE,
    payload: {
        message: message,
        errors: errors,
    },
});

export const requestRegister = (): AuthAction => ({
    type: AuthType.AUTH_REGISTER_REQUESTS,
});

export const registerSuccess = (message: string, user: User): AuthAction => ({
    type: AuthType.AUTH_REGISTER_SUCCESS,
    payload: {
        user: user,
        message: message,
    },
});

export const registerFailure = (message: string, errors: ErrorResponse[]): AuthAction => ({
    type: AuthType.AUTH_REGISTER_FAILURE,
    payload: {
        message: message,
        errors: errors,
    },
});