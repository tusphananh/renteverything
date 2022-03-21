import {
  createContext,
  Dispatch,
  FC,
  useContext,
  useEffect,
  useReducer
} from 'react'
import {
  addItemAction,
  checkSessionFailure,
  checkSessionSuccess,
  loginFailure,
  loginSuccess,
  registerFailure,
  registerSuccess,
  requestCheckSession,
  requestLogin,
  requestRegister
} from '../actions/authActions'
import { AuthAction, AuthState } from '../constants/AuthConstant'
import {
  useAddItemMutation,
  useCheckSessionLazyQuery,
  useLoginLazyQuery,
  useRegisterMutation
} from '../graphql-generated/graphql'
import AuthReducer from '../reducers/authReducer'

/**
 * Development context
 */
const initialState: AuthState = {
  // isAuthenticated: true,
  isAuthenticated: false,
  user: null,
  errors: [],
  isFetching: true,
}

export const AuthContext = createContext<{
  authState: AuthState
  authDispatch: Dispatch<AuthAction>
  authRegsiter: (
    phone: string,
    firstName: string,
    lastName: string,
    password: string,
  ) => Promise<void>
  addItem: (
    name: string,
    price: number,
    realValue: number,
    description: string,
  ) => void
  authLogin: (phone: string, password: string) => Promise<void>
}>({
  authState: initialState,
  authDispatch: () => undefined,
  authRegsiter: async () => {},
  authLogin: async () => {},
  addItem: () => {},
})

export const AuthProvider: FC = ({ children }) => {
  const [authState, authDispatch] = useReducer(AuthReducer, initialState)
  const [checkSession] = useCheckSessionLazyQuery({
    onCompleted: (data) => {
      const response = data?.checkSession
      if (response?.success) {
        authDispatch(checkSessionSuccess(response.data!))
      } else {
        authDispatch(checkSessionFailure())
        // console.log('check session error')
      }
    },
    onError: () => {
      // console.log(error)
      authDispatch(checkSessionFailure())
    },
  })
  const [loginLazyQuery] = useLoginLazyQuery({
    onCompleted: (data) => {
      console.log('somedata', data)
      if (data.login) {
        if (data.login.success) {
          authDispatch(loginSuccess(data.login.data!))
        } else {
          authDispatch(loginFailure(data.login.errors))
        }
      }
    },
  })

  const [addItemMutaion] = useAddItemMutation({
    onCompleted: (data) => {
      data.addItem?.success &&
        data.addItem.data &&
        authDispatch(addItemAction(data.addItem.data))
    },
  })
  const [registerMutation] = useRegisterMutation({
    onCompleted: (data) => {
      if (data.register) {
        if (data.register.success) {
          authDispatch(registerSuccess(data.register.data!))
        } else {
          authDispatch(registerFailure(data.register.errors))
        }
      }
    },
  })

  const authRegsiter = async (
    phone: string,
    firstName: string,
    lastName: string,
    password: string,
  ) => {
    authDispatch(requestRegister())
    await registerMutation({
      variables: {
        phone,
        firstName,
        lastName,
        password,
      },
    })
  }
  const addItem = (
    name: string,
    price: number,
    realValue: number,
    description: string,
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
      })
  }
  const authLogin = async (phone: string, password: string) => {
    authDispatch(requestLogin())
    loginLazyQuery({ variables: { phone, password } })
  }
  /**
   * Check user have session or not
   */

  useEffect(() => {
    authDispatch(requestCheckSession())
    checkSession()
  }, [])

  const authValues = {
    authState,
    authDispatch,
    authLogin,
    authRegsiter,
    addItem,
  }

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
