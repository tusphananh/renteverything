import React, { useEffect } from "react";
import { setAddress, setCurrentPosition } from "../actions/searchActions";
import {
  SearchAction,
  SearchInterface,
  searchScene,
  SearchState,
} from "../constants/SearchConstants";
import { SocketChannel } from "../constants/SocketConstants";
import { getReverseGeocoding } from "../libs/mapbox";
import searchReducer from "../reducers/searchReducer";
import { useAuthContext } from "./authContext";
import { useSocketContext } from "./socketContext";
const { v4: uuidv4 } = require("uuid");

const initialState: SearchState = {
  socket: undefined,
  isSearching: false,
  isFetching: false,
  results: [],
  error: null,
  searchs: [],
  search: null,
  curPos: null,
  address: "searching your location...",
  searchScene: searchScene.INPUT_DETAILS,
};

export const SearchContext = React.createContext<{
  searchState: SearchState;
  searchDispatch: React.Dispatch<SearchAction>;
  sendSearch: (name: string, radius: number, duration: number) => void;
}>({
  searchState: initialState,
  searchDispatch: () => undefined,
  sendSearch: () => {},
});

export const SearchProvider: React.FC = ({ children }) => {
  const { authState } = useAuthContext();
  const { socketState } = useSocketContext();
  const [searchState, searchDispatch] = React.useReducer(
    searchReducer,
    initialState
  );

  const setCurPos = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      searchDispatch(
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      );
      // console.log(position.coords);
    });
  };

  const sendSearch = (name: string, radius: number, duration: number) => {
    const search: SearchInterface = {
      name,
      radius,
      duration,
      id: uuidv4(),
      lat: searchState.curPos!.lat,
      lng: searchState.curPos!.lng,
      socketId: socketState.searchSocket!.id,
      userId: authState.user!.id,
    };

    socketState.searchSocket?.emit(SocketChannel.SEARCH, search);
  };

  useEffect(() => {
    /**
     * Get then Set current position
     */
    authState.isAuthenticated && setCurPos();
  }, []);

  useEffect(() => {
    const setAddressHandler = async () => {
      if (searchState.curPos) {
        const address = await getReverseGeocoding(searchState.curPos);
        console.log(address);
        searchDispatch(setAddress(address.toString()));
      }
    };
    setAddressHandler();
  }, [searchState.curPos]);

  const values = {
    searchState,
    searchDispatch,
    sendSearch,
  };

  return (
    <SearchContext.Provider value={values}>{children}</SearchContext.Provider>
  );
};

export const useSearchContext = () => React.useContext(SearchContext);
