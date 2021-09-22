import { useReducer, createContext, Dispatch, ReactNode } from "react";
import { AuthAction, AuthState } from "../constants/AuthConstant";
import AuthReducer from "../reducers/authReducer";

interface AuthContextProps {
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
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const authValues = {state, dispatch};
  
  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};
