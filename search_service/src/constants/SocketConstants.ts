import { SearchItem, SearchResult } from "./SearchConstants";
export interface ServerToClientEvents {
    noArg: () => void
    basicEmit: (a: number, b: string, c: Buffer) => void
    withAck: (d: string, callback: (e: number) => void) => void
    [SocketChannel.NEARBY]: (data: SearchItem) => void
    [SocketChannel.SEARCH]: (data: SearchItem) => void
    [SocketChannel.RESULT]: (data: SearchResult) => void
    [SocketChannel.CANCEL]: (data: SearchItem) => void
}

export interface ClientToServerEvents {
    hello: () => void
    [SocketChannel.SEARCH]: (data: SearchItem) => void
    [SocketChannel.RESULT]: (data: SearchResult) => void
    [SocketChannel.CANCEL]: (data: SearchItem) => void
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    name: string;
    age: number;
}
export enum SocketChannel {
    CONNECTION = 'connection',
    DISCONNECT = 'disconnect',
    NEARBY = 'nearby',
    SEARCH = 'search',
    RESULT = 'result',
    CANCEL = 'cancel',
    ACTIVITY_APPROVED = 'activity_approved',
}
