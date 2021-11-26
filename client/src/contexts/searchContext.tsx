import React, { useEffect } from "react";
import { setCurrentPosition } from "../actions/searchActions";
import { searchs } from "../constants/ExampleConstants";
import { SearchAction, SearchState } from "../constants/SearchConstants";
import searchReducer from "../reducers/searchReducer";

const initialState: SearchState = {
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

  useEffect(() => {
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
