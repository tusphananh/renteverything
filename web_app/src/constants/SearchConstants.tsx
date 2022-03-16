import { Item, User } from '../graphql-generated/graphql'
import { Position } from './DashBoardConstants'
import { Socket } from 'socket.io-client'
import { ClientToServerEvents, ServerToClientEvents } from './SocketConstants'

export enum SearchTypes {
  CLEAR_NEAR_BY_ITEMS = 'CLEAR_NEAR_BY_ITEMS',
  SEARCH_REQUEST = 'SEARCH_REQUEST',
  SEARCH_CANCEL = 'SEARCH_CANCEL',
  CLEAR_SOCKET = 'CLEAR_SOCKET',
  SET_CURRENT_POSITION = 'SET_CURRENT_POSITION',
  TO_INPUT_DETAILS_SCENE = 'TO_INPUT_DETAILS_SCENE',
  TO_INPUT_LOCATION_SCENE = 'TO_INPUT_LOCATION_SCENE',
  TO_RESULTS_SCENE = 'TO_RESULTS_SCENE',
  SET_ADDRESS = 'SET_ADDRESS',
  ADD_NEAR_BY_ITEM = 'ADD_NEAR_BY_ITEM',
  CONNECT_SEARCH_SOCKET = 'CONNECT_SEARCH_SOCKET',
  REMOVE_NEAR_BY_ITEM = 'REMOVE_NEAR_BY_ITEM',
  ADD_RESULT = 'ADD_RESULT',
  CLEAR_RESULTS = 'CLEAR_RESULTS',
  REMOVE_RESULT = 'REMOVE_RESULT',
  ADD_SEARCH = 'ADD_SEARCH',
  CLEAR_SEARCH = 'CLEAR_SEARCH',
}

export interface SearchItem {
  id: string
  userId: string
  socketId: string
  name: string
  lng: number
  lat: number
  radius: number
  duration: number
}

export interface SearchResult {
  searchId: string
  id: string
  providerPosition: Position
  provider: User
  name: string
  itemName: string
  itemPrice: number
  itemRealValue: number
  itemDescription: string
  totalPrice: number
  distance: number
  duration: number
}

export interface SearchState {
  searchSocket?: Socket<ServerToClientEvents, ClientToServerEvents>
  nearByItems?: NearByItem[] | []
  results: SearchResult[] | []
  isFetching?: boolean
  isSearching?: boolean
  error?: string | null
  curPos?: Position
  address?: string | null
  searchScene?: searchScene
  search?: SearchItem
}

export interface AddSearchAction {
  type: SearchTypes.ADD_SEARCH
  payload: {
    search: SearchItem
  }
}

export interface ClearSearchAction {
  type: SearchTypes.CLEAR_SEARCH
}
export interface AddResultAction {
  type: SearchTypes.ADD_RESULT
  payload: { result: SearchResult }
}

export interface RemoveResultAction {
  type: SearchTypes.REMOVE_RESULT
  payload: { id: string }
}

export interface ClearResultsAction {
  type: SearchTypes.CLEAR_RESULTS
}
export interface SetCurrentPositionAction {
  type: SearchTypes.SET_CURRENT_POSITION
  payload: {
    curPos: Position
  }
}

export interface SearchRequestAction {
  type: SearchTypes.SEARCH_REQUEST
}

export interface SearchCancelAction {
  type: SearchTypes.SEARCH_CANCEL
}

export interface ToInputDetailsSceneAction {
  type: SearchTypes.TO_INPUT_DETAILS_SCENE
}

export interface ToInputLocationSceneAction {
  type: SearchTypes.TO_INPUT_LOCATION_SCENE
}

export interface ToResultsSceneAction {
  type: SearchTypes.TO_RESULTS_SCENE
}

export interface SetAddressAction {
  type: SearchTypes.SET_ADDRESS
  payload: {
    address: string
  }
}

export interface AddNearByItemAction {
  type: SearchTypes.ADD_NEAR_BY_ITEM
  payload: {
    nearByItem: NearByItem
  }
}

export interface RemoveNearByItemAction {
  type: SearchTypes.REMOVE_NEAR_BY_ITEM
  payload: {
    id: string
  }
}
export interface ConnectSearchSocketAction {
  type: SearchTypes.CONNECT_SEARCH_SOCKET
  payload: {
    searchSocket: Socket<ServerToClientEvents, ClientToServerEvents>
  }
}

export interface ClearNearByItemsAction {
  type: SearchTypes.CLEAR_NEAR_BY_ITEMS
}

export interface ClearSocketAction {
  type: SearchTypes.CLEAR_SOCKET
}

export type SearchAction =
  | AddSearchAction
  | ClearSearchAction
  | AddResultAction
  | RemoveResultAction
  | ClearResultsAction
  | RemoveNearByItemAction
  | SetCurrentPositionAction
  | SearchRequestAction
  | SearchCancelAction
  | ToInputDetailsSceneAction
  | ToInputLocationSceneAction
  | ToResultsSceneAction
  | SetAddressAction
  | AddNearByItemAction
  | ConnectSearchSocketAction
  | ClearSocketAction
  | ClearNearByItemsAction

export enum searchAnimationVariantsName {
  HIDDEN = 'HIDDEN',
  VISIBLE = 'VISIBLE',
}

export enum MarkerType {
  GREEN = 'GREEN',
  RED = 'RED',
}

export enum searchScene {
  INPUT_DETAILS = 'INPUT_DETAILS',
  INPUT_LOCATION = 'INPUT_LOCATION',
  RESULTS = 'RESULTS',
}

export interface SearchAddress {
  id: string
  address: string
  position: Position
}

export interface NearByItem extends SearchItem {
  route_duration: number
  distance: number
}

export interface ConfirmInputValues {
  name?: string
  price?: number
  realValue?: number
  description?: string
}
