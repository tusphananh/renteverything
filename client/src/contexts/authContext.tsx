import { useReducer, createContext, Dispatch, useContext, FC } from "react";
import {
  requestLogin,
  loginFailure,
  loginSuccess,
  registerSuccess,
  registerFailure,
  requestRegister
} from "../actions/authAction";
import { AuthAction, AuthState } from "../constants/AuthConstant";
import {
  useLoginLazyQuery,
  useRegisterMutation,
} from "../graphql-generated/graphql";
import AuthReducer from "../reducers/authReducer";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  errors: [],
  isFetching: false,
};

export const AuthContext = createContext<{
  authState: AuthState;
  authDispatch: Dispatch<AuthAction>;
  authRegsiter: (
    phone: string,
    firstName: string,
    lastName: string,
    password: string
  ) => Promise<void>;
  authLogin: (phone: string, password: string) => Promise<void>;
}>({
  authState: initialState,
  authDispatch: () => undefined,
  authRegsiter: async () => {},
  authLogin: async () => {},
});

export const AuthProvider: FC = ({ children }) => {
  const [authState, authDispatch] = useReducer(AuthReducer, initialState);

  const [loginLazyQuery] = useLoginLazyQuery({
    onCompleted: (data) => {
      if (data.login) {
        if (data.login.success) {
          authDispatch(loginSuccess(data.login));
        } else {
          authDispatch(loginFailure(data.login));
        }
      }
    },
  });

  const [registerMutation] = useRegisterMutation({
    onCompleted: (data) => {
      if (data.register) {
        if (data.register.success) {
          authDispatch(registerSuccess(data.register));
        } else {
          authDispatch(registerFailure(data.register));
        }
      }
    },
  });

  const authRegsiter = async (
    phone: string,
    firstName: string,
    lastName: string,
    password: string
  ) => {
    authDispatch(requestRegister());
    await registerMutation({
      variables: {
        phone,
        firstName,
        lastName,
        password,
      },
    });
  };

  const authLogin = async (phone: string, password: string) => {
    authDispatch(requestLogin());
    loginLazyQuery({ variables: { phone, password } });
  };

  const authValues = { authState, authDispatch, authLogin, authRegsiter };

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
