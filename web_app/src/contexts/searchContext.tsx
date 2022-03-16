import React, { useEffect } from 'react'
import {
  addNearByItem,
  addResult,
  addSearch,
  clearNearByItems,
  clearSearch,
  connectSearchSocket,
  removeNearByItem,
  setAddress,
  setCurrentPosition,
} from '../actions/searchActions'
import { Position } from '../constants/DashBoardConstants'
import {
  NearByItem,
  SearchAction,
  SearchItem,
  SearchResult,
  searchScene,
  SearchState,
} from '../constants/SearchConstants'
import { SocketChannel } from '../constants/SocketConstants'
import { getDistance_and_Duration, getReverseGeocoding } from '../libs/mapbox'
import searchReducer from '../reducers/searchReducer'
import { useActivitiesContext } from './activitiesContext'
import { useAuthContext } from './authContext'

const initialState: SearchState = {
  search: undefined,
  searchSocket: undefined,
  isSearching: false,
  isFetching: false,
  results: [],
  error: null,
  nearByItems: [],
  curPos: undefined,
  address: 'searching your location...',
  searchScene: searchScene.INPUT_DETAILS,
}

export const SearchContext = React.createContext<{
  searchState: SearchState
  searchDispatch: React.Dispatch<SearchAction>
  sendSearch: (search: SearchItem) => void
  sendResult: (result: SearchResult) => void
  sendSearchCancel: () => void
}>({
  searchState: initialState,
  searchDispatch: () => undefined,
  sendSearch: () => {},
  sendResult: () => {},
  sendSearchCancel: () => {},
})

export const SearchProvider: React.FC = ({ children }) => {
  const { authState } = useAuthContext()
  const { activitiesDispatch } = useActivitiesContext()

  const [searchState, searchDispatch] = React.useReducer(
    searchReducer,
    initialState,
  )

  const sendSearchCancel = () => {
    if (searchState.search) {
      searchState.searchSocket?.emit(SocketChannel.CANCEL, searchState.search)
      console.log('sendSearchCancel')
      searchDispatch(clearSearch())
    }
  }

  const sendResult = (result: SearchResult) => {
    searchState.searchSocket?.emit(SocketChannel.RESULT, result)
  }

  const setCurPos = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      searchDispatch(
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      )
      // console.log(position.coords);
    })
  }

  const setAddressHandler = async () => {
    if (searchState.curPos) {
      const address = await getReverseGeocoding(searchState.curPos)
      console.log(address)
      searchDispatch(setAddress(address.toString()))
    }
  }

  const setSearchSocket = () => {
    console.log('Start set search socket')
    searchDispatch(connectSearchSocket())
  }

  const _addNearByItem = async (data: SearchItem, pos: Position) => {
    const { distance, duration } = await getDistance_and_Duration(pos, {
      lat: data.lat,
      lng: data.lng,
    })
    // console.log(`Distance: ${distance} and take ${duration} min`)
    if (distance <= data.radius) {
      const item: NearByItem = {
        ...data,
        distance,
        route_duration: duration,
      }
      // console.log(item);
      searchDispatch(addNearByItem(item))
    }
  }

  const sendSearch = (search: SearchItem) => {
    searchDispatch(addSearch(search))
    // console.log(searchState.search)
    searchState.searchSocket?.emit(SocketChannel.SEARCH, search)
  }

  useEffect(() => {
    /**
     * Get then Set current position
     */
    authState.isAuthenticated && setCurPos()

    /**
     * Connect to Socket socket
     */
  }, [authState.isAuthenticated])

  useEffect(() => {
    /**
     * For each new position we will re-new the address
     */
    setAddressHandler()

    /**
     * For each new position we will re-new the socket to load new NearByItems
     */
    console.log('Reset socket')
    searchState.searchSocket?.disconnect()
    searchDispatch(clearNearByItems())
    searchState.curPos && setSearchSocket()
  }, [searchState.curPos])

  useEffect(() => {
    if (searchState.searchSocket && authState.isAuthenticated) {
      searchState.searchSocket.on('connect', () => {
        console.log('Connected to search socket')
      })

      /**
       * When a new search is sent, we will add it to the NearByItems
       */
      searchState.searchSocket.on(SocketChannel.NEARBY, (data: SearchItem) => {
        _addNearByItem(data, searchState.curPos!)
      })

      /**
       * When a result is received
       */
      searchState.searchSocket.on(
        SocketChannel.RESULT,
        (data: SearchResult) => {
          // console.log(data)
          searchDispatch(addResult(data))
        },
      )

      /**
       * When other cancels a search or disconnected
       */
      searchState.searchSocket.on(SocketChannel.CANCEL, (data: SearchItem) => {
        searchDispatch(removeNearByItem(data.id))
      })
    }
  }, [searchState.searchSocket])

  const values = {
    searchState,
    searchDispatch,
    sendSearch,
    sendResult,
    sendSearchCancel,
  }

  return (
    <SearchContext.Provider value={values}>{children}</SearchContext.Provider>
  )
}

export const useSearchContext = () => React.useContext(SearchContext)
