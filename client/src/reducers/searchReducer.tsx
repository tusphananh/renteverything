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
    case SearchConstants.SEARCH_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case SearchConstants.SEARCH_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        searchs: action.payload?.searchs,
        error: null,
      };
    case SearchConstants.SEARCH_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload?.error,
      };
    case SearchConstants.SEARCH_FETCH_MORE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        searchs: [...state.searchs!, ...action.payload?.searchs!],
        error: null,
      };
    case SearchConstants.SEARCH_FETCH_MORE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload?.error,
      };
    case SearchConstants.RESULT_FETCH_MORE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case SearchConstants.RESULT_FETCH_MORE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        results: action.payload?.results,
        error: null,
      };
    case SearchConstants.RESULT_FETCH_MORE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload?.error,
      };
    case SearchConstants.RESULT_CLEAR:
      return {
        ...state,
        results: [],
      };

    default:
      return state;
  }
};

export default searchReducer;
