import React, { useEffect } from 'react'
import {
  addMessage,
  addProvideActivities,
  addProvideActivity,
  addRentActivities,
  addRentActivity,
  setChatSocket,
} from '../actions/activitiesActions'
import {
  ActivitiesAction,
  ActivitiesState,
  ActivityMaybe,
  MessageMaybe,
} from '../constants/ActivitiesConstants'
import { SearchResult } from '../constants/SearchConstants'
import { SocketChannel } from '../constants/SocketConstants'
import {
  useAddActivityMutation,
  useAddMessageMutation,
  useGetProvideActivitiesLazyQuery,
  useGetRentActivitiesLazyQuery,
} from '../graphql-generated/graphql'
import activitiesReducer from '../reducers/activitiesReducer'
import { useAuthContext } from './authContext'

const initialState: ActivitiesState = {
  chatSocket: undefined,
  provideActivities: [],
  rentActivities: [],
  isFetching: false,
  error: null,
}

export const ActivitiesContext = React.createContext<{
  activitiesState: ActivitiesState
  activitiesDispatch: React.Dispatch<ActivitiesAction>
  sendMessage: (id: string, chatId: number, text: string) => void
  approveResult: (result: SearchResult) => void
}>({
  activitiesState: initialState,
  activitiesDispatch: () => undefined,
  sendMessage: () => undefined,
  approveResult: () => {},
})

export const ActivitiesProvider: React.FC = ({ children }) => {
  const [activitiesState, activitiesDispatch] = React.useReducer(
    activitiesReducer,
    initialState,
  )
  const { authState } = useAuthContext()
  const getActivityByChatId = (chatId: string): ActivityMaybe | null => {
    let act = null
    let found = false
    !found &&
      activitiesState.provideActivities.forEach((activity) => {
        if (activity.chat.id === chatId) {
          act = activity
          found = true
        }
      })

    !found &&
      activitiesState.rentActivities.forEach((activity) => {
        if (activity.chat.id === chatId) {
          act = activity
          found = true
        }
      })

    return act
  }

  const [addActivity] = useAddActivityMutation({
    onCompleted: (data) => {
      if (data.addActivity?.success) {
        activitiesDispatch(addRentActivity(data.addActivity.data))
      } else {
        /**
         * TODO: handle error
         */
      }
    },
  })
  const [getRentActivities] = useGetRentActivitiesLazyQuery({
    onCompleted: (data) => {
      data.getRentActivities?.success &&
        activitiesDispatch(addRentActivities(data.getRentActivities.data))
    },
  })
  const [getProvideActivities] = useGetProvideActivitiesLazyQuery({
    onCompleted: (data) => {
      data.getProvideActivities?.success &&
        activitiesDispatch(addProvideActivities(data.getProvideActivities.data))
    },
  })

  const [addMessageMutation] = useAddMessageMutation({
    onCompleted: (data) => {
      if (data.addMessage?.success) {
        activitiesDispatch(addMessage(data.addMessage.data))
        const chatId = data.addMessage.data!.chatId.toString()
        const act = getActivityByChatId(chatId)
        console.log(act)
        if (act) {
          const toUserId =
            authState.user!.id === act.renter.id
              ? act.provider.id
              : act.renter.id
          activitiesState.chatSocket?.emit(SocketChannel.MESSAGE, {
            toUserId,
            message: data.addMessage.data!,
          })
        }
      }
    },
  })
  const approveResult = async (result: SearchResult) => {
    authState.user &&
      (await addActivity({
        variables: {
          id: result.searchId,
          itemName: result.itemName,
          itemPrice: result.itemPrice,
          distance: result.distance,
          duration: result.duration,
          itemDescription: result.itemDescription,
          itemRealValue: result.itemRealValue,
          name: result.name,
          providerId: result.provider.id,
          renterId: authState.user.id,
          totalPrice: result.totalPrice,
        },
      }))
  }
  const getAllActivities = () => {
    if (authState.isAuthenticated) {
      // console.log('getAllActivities')
      getRentActivities()
      getProvideActivities()
    }
  }

  const sendMessage = (id: string, chatId: number, text: string) => {
    if (authState.isAuthenticated) {
      // console.log('sendMessage')
      addMessageMutation({
        variables: {
          id,
          chatId,
          text,
        },
      })
    }
  }

  useEffect(() => {
    if (activitiesState.chatSocket && authState.isAuthenticated) {
      activitiesState.chatSocket?.on('connect', () => {
        console.log('Connected to chat socket')
        activitiesState.chatSocket?.emit(SocketChannel.SET_SOCKET_ID, {
          socketId: activitiesState.chatSocket.id,
          userId: authState.user!.id.toString(),
        })
      })
      activitiesState.chatSocket?.on(
        SocketChannel.MESSAGE,
        (data: MessageMaybe) => {
          activitiesDispatch(addMessage(data))
        },
      )
    }
  }, [activitiesState.chatSocket])
  useEffect(() => {
    getAllActivities()
    activitiesDispatch(setChatSocket())
  }, [authState.isAuthenticated])

  const values = {
    activitiesState,
    activitiesDispatch,
    sendMessage,
    approveResult,
  }
  return (
    <ActivitiesContext.Provider value={values}>
      {children}
    </ActivitiesContext.Provider>
  )
}

export const useActivitiesContext = () => React.useContext(ActivitiesContext)
