import React from "react";
import { SearchAction, SearchState } from "../constants/SearchConstants";
import searchReducer from "../reducers/searchReducer";
const initialState: SearchState = {
  isSearching: false,
  isFetching: false,
  results: [],
  error: null,
  searchs: [],
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

  const values = {
    searchState,
    searchDispatch,
  };

  return (
    <SearchContext.Provider value={values}>{children}</SearchContext.Provider>
  );
};

export const useSearchContext = () => React.useContext(SearchContext);
