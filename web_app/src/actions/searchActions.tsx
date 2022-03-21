import { Position } from '../constants/DashBoardConstants'
import {
  AddNearByItemAction,
  AddResultAction,
  AddSearchAction,
  ClearNearByItemsAction,
  ClearResultsAction,
  ClearSearchAction,
  ClearSocketAction,
  ConnectSearchSocketAction,
  NearByItem,
  RemoveNearByItemAction,
  RemoveResultAction,
  SearchCancelAction,
  SearchItem,
  SearchRequestAction,
  SearchResult,
  SearchTypes,
  SetAddressAction,
  SetCurrentPositionAction,
  ToInputDetailsSceneAction,
  ToInputLocationSceneAction,
  ToResultsSceneAction
} from '../constants/SearchConstants'
import { getSocket } from '../libs/socket'

export const setCurrentPosition = (
  position: Position,
): SetCurrentPositionAction => ({
  type: SearchTypes.SET_CURRENT_POSITION,
  payload: {
    curPos: position,
  },
})

export const searchRequest = (): SearchRequestAction => ({
  type: SearchTypes.SEARCH_REQUEST,
})

export const searchCancel = (): SearchCancelAction => ({
  type: SearchTypes.SEARCH_CANCEL,
})

export const toInputDetailsScene = (): ToInputDetailsSceneAction => ({
  type: SearchTypes.TO_INPUT_DETAILS_SCENE,
})

export const toInputLocationScene = (): ToInputLocationSceneAction => ({
  type: SearchTypes.TO_INPUT_LOCATION_SCENE,
})

export const toResultsScene = (): ToResultsSceneAction => ({
  type: SearchTypes.TO_RESULTS_SCENE,
})

export const setAddress = (address: string): SetAddressAction => ({
  type: SearchTypes.SET_ADDRESS,
  payload: {
    address,
  },
})

export const addNearByItem = (item: NearByItem): AddNearByItemAction => ({
  type: SearchTypes.ADD_NEAR_BY_ITEM,
  payload: {
    nearByItem: item,
  },
})

export const removeNearByItem = (id: string): RemoveNearByItemAction => ({
  type: SearchTypes.REMOVE_NEAR_BY_ITEM,
  payload: {
    id: id,
  },
})

export const connectSearchSocket = (): ConnectSearchSocketAction => {
  const url = `${process.env.NEXT_PUBLIC_SEARCH_SOCKET_URL}`
  const socket = getSocket(url)

  return {
    type: SearchTypes.CONNECT_SEARCH_SOCKET,
    payload: { searchSocket: socket },
  }
}

export const clearNearByItems = (): ClearNearByItemsAction => ({
  type: SearchTypes.CLEAR_NEAR_BY_ITEMS,
})

export const clearSocket = (): ClearSocketAction => ({
  type: SearchTypes.CLEAR_SOCKET,
})

export const addResult = (result: SearchResult): AddResultAction => ({
  type: SearchTypes.ADD_RESULT,
  payload: {
    result: result,
  },
})

export const removeResult = (id: string): RemoveResultAction => ({
  type: SearchTypes.REMOVE_RESULT,
  payload: {
    id: id,
  },
})

export const clearResult = (): ClearResultsAction => ({
  type: SearchTypes.CLEAR_RESULTS,
})

export const addSearch = (search: SearchItem): AddSearchAction => ({
  type: SearchTypes.ADD_SEARCH,
  payload: {
    search: search,
  },
})

export const clearSearch = (): ClearSearchAction => ({
  type: SearchTypes.CLEAR_SEARCH,
})
