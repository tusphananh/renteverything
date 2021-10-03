import { AuthAction, AuthType } from "../constants/AuthConstant";
import { UserResponse } from "../graphql-generated/graphql";

export const requestLogin = (): AuthAction => ({
    type: AuthType.AUTH_LOGIN_REQUESTS,
});

export const loginSuccess = (response: UserResponse): AuthAction => ({
    type: AuthType.AUTH_LOGIN_SUCCESS,
    payload: {
        user: response.data,
    },
});

export const loginFailure = (response: UserResponse): AuthAction => ({
    type: AuthType.AUTH_LOGIN_FAILURE,
    payload: {
        errors: response.errors || [],
    },
});

export const requestRegister = (): AuthAction => ({
    type: AuthType.AUTH_REGISTER_REQUESTS,
});

export const registerSuccess = (response: UserResponse): AuthAction => ({
    type: AuthType.AUTH_REGISTER_SUCCESS,
    payload: {
        user: response.data,

    },
});

export const registerFailure = (response: UserResponse): AuthAction => ({
    type: AuthType.AUTH_REGISTER_FAILURE,
    payload: {
        errors: response.errors || [],
    },
});