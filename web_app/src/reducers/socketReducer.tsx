import {
  SocketAction,
  SocketState,
  SocketTypes,
} from "../constants/SocketConstants";

export const socketReducer = (state: SocketState, action: SocketAction) => {
  switch (action.type) {
    case SocketTypes.CONNECT_SEARCH_SOCKET:
      return {
        ...state,
        searchSocket: action.payload?.searchSocket,
      };
    default:
      return state;
  }
};
