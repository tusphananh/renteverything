import {
  SearchAction,
  SearchConstants,
  searchScene,
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
    case SearchConstants.TO_INPUT_DETAILS_SCENE:
      return {
        ...state,
        searchScene: searchScene.INPUT_DETAILS,
      };
    case SearchConstants.TO_INPUT_LOCATION_SCENE:
      return {
        ...state,
        searchScene: searchScene.INPUT_LOCATION,
      };
    case SearchConstants.TO_RESULTS_SCENE:
      return {
        ...state,
        searchScene: searchScene.RESULTS,
      };
    case SearchConstants.SET_ADDRESS:
      return {
        ...state,
        address: action.payload?.address,
      };
    default:
      return state;
  }
};

export default searchReducer;
