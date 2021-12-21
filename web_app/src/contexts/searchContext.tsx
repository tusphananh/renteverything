import React, { useEffect } from "react";
import { setCurrentPosition } from "../actions/searchActions";
import { searchs } from "../constants/ExampleConstants";
import { SearchAction, SearchState } from "../constants/SearchConstants";
import { getSocket } from "../libs/socket";
import searchReducer from "../reducers/searchReducer";

const initialState: SearchState = {
  socket: undefined,
  isSearching: false,
  isFetching: false,
  results: [],
  error: null,
  searchs: searchs,
  curPos: null,
};

export const SearchContext = React.createContext<{
  searchState: SearchState;
  searchDispatch: React.Dispatch<SearchAction>;
}>({
  searchState: initialState,
  searchDispatch: () => undefined,
});

export const SearchProvider: React.FC = ({ children }) => {
  const [searchState, searchDispatch] = React.useReducer(
    searchReducer,
    initialState
  );

  const setSocket = () => {
    if (!searchState.socket) {
      console.log(process.env.NEXT_PUBLIC_SEARCH_SOCKET_URL);
      searchState.socket = getSocket(
        `${process.env.NEXT_PUBLIC_SEARCH_SOCKET_URL}`
      );
    }
  };

  useEffect(() => {
    /**
     * Connect to search socket
     */
    setSocket();

    /**
     * socket handlers
     */
    searchState?.socket?.on("connect", () => {
      console.log("connected to search socket");
    });

    /**
     * Get then Set current position
     */
    const setCurPos = async () => {
      await navigator.geolocation.getCurrentPosition((position) => {
        searchDispatch(
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        );
        console.log(position.coords);
      });
    };
    setCurPos();
  }, []);

  const values = {
    searchState,
    searchDispatch,
  };

  return (
    <SearchContext.Provider value={values}>{children}</SearchContext.Provider>
  );
};

export const useSearchContext = () => React.useContext(SearchContext);
