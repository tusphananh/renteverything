import { useReducer, createContext, Dispatch, useContext, FC } from "react";
import {
  requestLogin,
  loginFailure,
  loginSuccess,
} from "../actions/authAction";
import { AuthAction, AuthState } from "../constants/AuthConstant";
import { useLoginLazyQuery } from "../graphql-generated/graphql";
import AuthReducer from "../reducers/authReducer";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  errors: [],
  isFetching: true,
  message: null,
};

export const AuthContext = createContext<{
  authState: AuthState;
  authDispatch: Dispatch<AuthAction>;
  authLogin: (phone: string, password: string) => Promise<void>;
}>({
  authState: initialState,
  authDispatch: () => undefined,
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

  const authLogin = async (phone: string, password: string) => {
    authDispatch(requestLogin());
    loginLazyQuery({ variables: { phone, password } });
  };

  const authValues = { authState, authDispatch, authLogin };

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
