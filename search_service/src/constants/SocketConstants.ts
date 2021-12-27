import SearchInterface from "./SearchConstants";


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

export enum SocketChannel {
    CONNECTION = "connection",
    DISCONNECT = "disconnect",
    NEARBY = "nearby",
    SEARCH = "search",
}

