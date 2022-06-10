/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  Dispatch,
  FC,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  updateBalanceAction,
  addItemAction,
  checkSessionFailure,
  checkSessionSuccess,
  deleteItemAction,
  loginFailure,
  loginSuccess,
  logoutAction,
  registerFailure,
  registerSuccess,
  requestCheckSession,
  requestLogin,
  requestRegister,
} from "../actions/authActions";
import { AuthAction, AuthState } from "../constants/AuthConstant";
import {
  useAddBalanceMutation,
  useAddItemMutation,
  useCheckSessionLazyQuery,
  useDeleteItemMutation,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useSubtractBalanceMutation,
} from "../graphql-generated/graphql";
import AuthReducer from "../reducers/authReducer";

/**
 * Development context
 */
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  // isAuthenticated: true,
  // user: {
  //   id: '1',
  //   balance: 0,
  //   createdAt: '2020-01-01T00:00:00.000Z',
  //   firstName: 'Tu',
  //   lastName: 'Nguyen',
  //   items: [],
  //   phone: '0987654321',
  //   updatedAt: '2020-01-01T00:00:00.000Z',
  // },
  errors: [],
  isFetching: true,
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
  addItem: (
    name: string,
    price: number,
    realValue: number,
    description: string
  ) => void;
  deleteItem: (id: number) => void;
  authLogin: (phone: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  topUp: (amount: number) => Promise<void>;
  subtractBalance: (amount: number) => Promise<void>;
}>({
  authState: initialState,
  authDispatch: () => undefined,
  authRegsiter: async () => {},
  authLogin: async () => {},
  addItem: () => {},
  deleteItem: () => {},
  logout: async () => {},
  topUp: async () => {},
  subtractBalance: async () => {},
});

export const AuthProvider: FC = ({ children }) => {
  const [authState, authDispatch] = useReducer(AuthReducer, initialState);
  const [topUpMutation] = useAddBalanceMutation({
    onCompleted: (data) => {
      const response = data?.addBalance;
      if (response?.success) {
        authDispatch(updateBalanceAction(response.data!.balance));
      }
    },
  });
  const [subtractBalanceMutation] = useSubtractBalanceMutation({
    onCompleted: (data) => {
      const response = data?.subtractBalance;
      if (response?.success) {
        authDispatch(updateBalanceAction(response.data!.balance));
      }
    },
  });
  const [checkSession] = useCheckSessionLazyQuery({
    onCompleted: (data) => {
      const response = data?.checkSession;
      if (response?.success) {
        authDispatch(checkSessionSuccess(response.data!));
      } else {
        authDispatch(checkSessionFailure());
        console.log("check session error");
      }
    },
    onError: (error) => {
      console.log(error);
      authDispatch(checkSessionFailure());
    },
  });
  const [loginLazyQuery, { client }] = useLoginMutation({
    onCompleted: (data) => {
      if (data.login) {
        if (data.login.success) {
          authDispatch(loginSuccess(data.login.data!));
        } else {
          authDispatch(loginFailure(data.login.errors));
        }
      }
    },
  });

  const [addItemMutaion] = useAddItemMutation({
    onCompleted: (data) => {
      data.addItem?.success &&
        data.addItem.data &&
        authDispatch(addItemAction(data.addItem.data));
    },
  });

  const [deleteItemMutation] = useDeleteItemMutation({
    onCompleted: (data) => {
      data.deleteItem?.success &&
        data.deleteItem.data &&
        authDispatch(deleteItemAction(data.deleteItem.data));
    },
  });
  const [registerMutation] = useRegisterMutation({
    onCompleted: (data) => {
      if (data.register) {
        if (data.register.success) {
          authDispatch(registerSuccess(data.register.data!));
        } else {
          authDispatch(registerFailure(data.register.errors));
        }
      }
    },
  });

  const [logoutQuery] = useLogoutMutation({
    onCompleted: async () => {
      await client.clearStore();
      authDispatch(logoutAction());
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const logout = async () => {
    await logoutQuery();
  };

  const topUp = async (amount: number) => {
    await topUpMutation({
      variables: {
        amount,
      },
    });
  };

  const subtractBalance = async (amount: number) => {
    await subtractBalanceMutation({
      variables: {
        amount,
      },
    });
  };

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
  const addItem = (
    name: string,
    price: number,
    realValue: number,
    description: string
  ) => {
    name &&
      price &&
      realValue &&
      description &&
      addItemMutaion({
        variables: {
          name,
          price,
          realValue,
          description,
        },
      });
  };
  const deleteItem = (id: number) => {
    id && deleteItemMutation({ variables: { id } });
  };
  const authLogin = async (phone: string, password: string) => {
    authDispatch(requestLogin());

    loginLazyQuery({ variables: { phone, password } });
  };
  /**
   * Check user have session or not
   */

  useEffect(() => {
    authDispatch(requestCheckSession());
    checkSession();
  }, []);

  const authValues = {
    authState,
    authDispatch,
    authLogin,
    authRegsiter,
    addItem,
    deleteItem,
    logout,
    topUp,
    subtractBalance,
  };

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
