import { Socket } from 'socket.io-client'
import { MessageMaybe } from './ActivitiesConstants'
import { SearchItem, SearchResult } from './SearchConstants'

export interface ServerToClientEvents {
  noArg: () => void
  basicEmit: (a: number, b: string, c: Buffer) => void
  withAck: (d: string, callback: (e: number) => void) => void
  [SocketChannel.NEARBY]: (data: SearchItem) => void
  [SocketChannel.SEARCH]: (data: SearchItem) => void
  [SocketChannel.RESULT]: (data: SearchResult) => void
  [SocketChannel.CANCEL]: (data: SearchItem) => void
  [SocketChannel.MESSAGE]: (data: MessageMaybe) => void
}

export interface ClientToServerEvents {
  hello: () => void
  [SocketChannel.SEARCH]: (data: SearchItem) => void
  [SocketChannel.RESULT]: (data: SearchResult) => void
  [SocketChannel.CANCEL]: (data: SearchItem) => void
  [SocketChannel.MESSAGE]: (data: MessageItem) => void
  [SocketChannel.SET_SOCKET_ID]: (data: SocketItem) => void
}

export interface InterServerEvents {
  ping: () => void
}
export interface MessageItem {
  message: MessageMaybe
  toUserId: string
}

export interface SocketItem {
  socketId: string
  userId: string
}

export interface SocketData {
  name: string
  age: number
}
export interface SocketState {
  searchSocket?: Socket | undefined
}
export enum SocketChannel {
  SET_SOCKET_ID = 'setSocketId',
  MESSAGE = 'message',
  CONNECTION = 'connection',
  DISCONNECT = 'disconnect',
  NEARBY = 'nearby',
  SEARCH = 'search',
  RESULT = 'result',
  CANCEL = 'cancel',
}

export enum SocketTypes {
  CONNECT_SEARCH_SOCKET = 'CONNECT_SEARCH_SOCKET',
  CONNECT_MESSAGE_SOCKET = 'CONNECT_MESSAGE_SOCKET',
}

export interface SocketAction {
  type: SocketTypes
  payload?: SocketState
}
