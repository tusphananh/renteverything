import {
  SearchAction,
  SearchConstants,
  SearchState,
} from "../constants/SearchConstants";

const searchReducer = (
  state: SearchState,
  action: SearchAction
): SearchState => {
  switch (action.type) {
    case SearchConstants.SEARCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        isSearching: true,
      };
    case SearchConstants.SEARCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        results: action.payload?.results,
      };
    case SearchConstants.SEARCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload?.error,
      };
    case SearchConstants.CLEAR_RESULTS:
      return {
        ...state,
        results: [],
      };
    case SearchConstants.SEARCH_CANCEL:
      return {
        ...state,
        isSearching: false,
        isFetching: false,
        results: [],
      };
    case SearchConstants.SET_CURRENT_POSITION:
      return {
        ...state,
        curPos: action.payload?.curPos!,
      };

    default:
      return state;
  }
};

export default searchReducer;
