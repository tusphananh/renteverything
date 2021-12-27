import { Socket } from "socket.io-client";
import { SearchInterface } from "./SearchConstants";

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  [SocketChannel.NEARBY]: (data: SearchInterface) => void;
  [SocketChannel.SEARCH]: (data: SearchInterface) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  [SocketChannel.SEARCH]: (data: SearchInterface) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
export interface SocketState {
  searchSocket?: Socket | undefined;
}

export enum SocketChannel {
  CONNECTION = "connection",
  DISCONNECT = "disconnect",
  NEARBY = "nearby",
  SEARCH = "search",
}

export enum SocketTypes {
  CONNECT_SEARCH_SOCKET = "CONNECT_SEARCH_SOCKET",
  CONNECT_MESSAGE_SOCKET = "CONNECT_MESSAGE_SOCKET",
}

export interface SocketAction {
  type: SocketTypes;
  payload?: SocketState;
}
