import React, { useEffect } from "react";
import { Socket } from "socket.io-client";
import { addSearch } from "../actions/searchActions";
import { connectSearchSocket } from "../actions/socketActions";
import { SearchInterface } from "../constants/SearchConstants";
import {
  SocketAction,
  SocketChannel,
  SocketState,
} from "../constants/SocketConstants";
import { getSocket } from "../libs/socket";
import { socketReducer } from "../reducers/socketReducer";
import { useAuthContext } from "./authContext";
import { useSearchContext } from "./searchContext";

const initialState: SocketState = {
  searchSocket: undefined,
};

export const SocketContext = React.createContext<{
  socketState: SocketState;
  socketDispatch: React.Dispatch<SocketAction>;
}>({
  socketState: initialState,
  socketDispatch: () => undefined,
});

export const SocketProvider: React.FC = ({ children }) => {
  const { authState } = useAuthContext();
  const [socketState, socketDispatch] = React.useReducer(
    socketReducer,
    initialState
  );
  const { searchDispatch } = useSearchContext();

  const setSearchSocket = () => {
    if (!socketState.searchSocket) {
      const url = `${process.env.NEXT_PUBLIC_SEARCH_SOCKET_URL}`;
      //   console.log(url);
      socketDispatch(connectSearchSocket(getSocket(url)));
    }
  };

  useEffect(() => {
    /**
     * Connect to Socket socket
     */
    authState.isAuthenticated && setSearchSocket();

    /**
     * socket handlers
     */
  }, []);

  useEffect(() => {
    /**
     * Handle Search Socket events
     */
    if (socketState.searchSocket) {
      socketState?.searchSocket?.on(
        SocketChannel.CONNECTION,
        (socket: Socket) => {
          console.log("connected to Socket server");
        }
      );

      /**
       * Get all searchs here
       */
      socketState?.searchSocket?.on(
        SocketChannel.NEARBY,
        (data: SearchInterface) => {
          // console.log("nearby searchs", data);
          searchDispatch(addSearch(data));
        }
      );
    }
  }, [socketState.searchSocket]);

  const values = {
    socketState,
    socketDispatch,
  };

  return (
    <SocketContext.Provider value={values}>{children}</SocketContext.Provider>
  );
};

export const useSocketContext = () => React.useContext(SocketContext);
