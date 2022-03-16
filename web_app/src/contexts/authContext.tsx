import {
  createContext,
  Dispatch,
  FC,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import {
  checkSessionFailure,
  checkSessionSuccess,
  loginFailure,
  loginSuccess,
  registerFailure,
  registerSuccess,
  requestCheckSession,
  requestLogin,
  requestRegister,
} from '../actions/authActions'
import { AuthAction, AuthState } from '../constants/AuthConstant'
import {
  useCheckSessionQuery,
  useLoginLazyQuery,
  useRegisterMutation,
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
  authLogin: (phone: string, password: string) => Promise<void>
}>({
  authState: initialState,
  authDispatch: () => undefined,
  authRegsiter: async () => {},
  authLogin: async () => {},
})

export const AuthProvider: FC = ({ children }) => {
  const [authState, authDispatch] = useReducer(AuthReducer, initialState)
  const checkSessionQuery = useCheckSessionQuery()
  const [loginLazyQuery] = useLoginLazyQuery({
    onCompleted: (data) => {
      console.log('somedata', data)
      if (data.login) {
        if (data.login.success) {
          authDispatch(loginSuccess(data.login))
        } else {
          authDispatch(loginFailure(data.login))
        }
      }
    },
  })

  const [registerMutation] = useRegisterMutation({
    onCompleted: (data) => {
      if (data.register) {
        if (data.register.success) {
          authDispatch(registerSuccess(data.register))
        } else {
          authDispatch(registerFailure(data.register))
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

  /**
   * Check user have session or not
   */

  useEffect(() => {
    authDispatch(requestCheckSession())
    const response = checkSessionQuery.data?.checkSession
    // console.log(checkSessionQuery)
    if (response?.success) {
      authDispatch(checkSessionSuccess(response))
      // console.log(authState.user)
    } else {
      /**
       * Development context
       */
      // authDispatch(checkSessionSuccess(responseEx))
      authDispatch(checkSessionFailure())

      console.log('check session error')
    }
  }, [checkSessionQuery.data?.checkSession])

  const authLogin = async (phone: string, password: string) => {
    authDispatch(requestLogin())
    loginLazyQuery({ variables: { phone, password } })
  }

  const authValues = { authState, authDispatch, authLogin, authRegsiter }

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
