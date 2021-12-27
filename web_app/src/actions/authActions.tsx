import { AuthAction, AuthTypes } from "../constants/AuthConstant";
import { UserResponse } from "../graphql-generated/graphql";

export const requestLogin = (): AuthAction => ({
    type: AuthTypes.AUTH_LOGIN_REQUESTS,
});

export const loginSuccess = (response: UserResponse): AuthAction => ({
    type: AuthTypes.AUTH_LOGIN_SUCCESS,
    payload: {
        user: response.data,
    },
});

export const loginFailure = (response: UserResponse): AuthAction => ({
    type: AuthTypes.AUTH_LOGIN_FAILURE,
    payload: {
        errors: response.errors || [],
    },
});

export const requestRegister = (): AuthAction => ({
    type: AuthTypes.AUTH_REGISTER_REQUESTS,
});

export const registerSuccess = (response: UserResponse): AuthAction => ({
    type: AuthTypes.AUTH_REGISTER_SUCCESS,
    payload: {
        user: response.data,

    },
});

export const registerFailure = (response: UserResponse): AuthAction => ({
    type: AuthTypes.AUTH_REGISTER_FAILURE,
    payload: {
        errors: response.errors || [],
    },
});

export const requestCheckSession = (): AuthAction => ({
    type: AuthTypes.AUTH_CHECK_SESSION_REQUESTS,
});

export const checkSessionSuccess = (response: UserResponse): AuthAction => ({
    type: AuthTypes.AUTH_CHECK_SESSION_SUCCESS,
    payload: {
        user: response.data,
    },
});

export const checkSessionFailure = (): AuthAction => ({
    type: AuthTypes.AUTH_CHECK_SESSION_FAILURE,
    payload: {
        errors: [],
    },
});