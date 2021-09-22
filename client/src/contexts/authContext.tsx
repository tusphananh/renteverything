import {
  useReducer,
  createContext,
  Dispatch,
  ReactNode,
  useContext,
} from "react";
import {
  requestLogin,
  loginFailure,
  loginSuccess,
} from "../actions/authAction";
import { AuthAction, AuthState } from "../constants/AuthConstant";
import { useLoginQuery } from "../graphql-generated/graphql";
import AuthReducer from "../reducers/authReducer";

interface Props {
  children: ReactNode;
}

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

export const AuthProvider = ({ children }: Props) => {
  const [authState, authDispatch] = useReducer(AuthReducer, initialState);

  const authLogin = async (phone: string, password: string) => {
    authDispatch(requestLogin());
    const { data } = useLoginQuery({ variables: { phone, password } });
    console.log(data);
    const response = data?.login;

    if (response?.success) {
      if (response.success) {
        authDispatch(loginSuccess(response));
        console.log("login success");
      } else {
        authDispatch(loginFailure(response));
        console.log("login faile");
      }
    }
  };

  const authValues = { authState, authDispatch, authLogin };

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
