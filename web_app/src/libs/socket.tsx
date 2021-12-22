import { io, Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../constants/SocketConstants";

// please note that the types are reversed
// because the server is the client and the client is the server

export const getSocket = (url: string): Socket => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(url, {
    withCredentials: true,
  });

  if (socket) {
    console.log("Socket loaded successfully");
  } else {
    console.log("Socket load failed");
  }
  return socket;
};
