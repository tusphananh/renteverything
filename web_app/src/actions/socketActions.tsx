import { Socket } from "socket.io-client";
import { SocketTypes } from "../constants/SocketConstants";

export const connectSearchSocket = (socket: Socket) => ({
  type: SocketTypes.CONNECT_SEARCH_SOCKET,
  payload: { searchSocket: socket },
});
