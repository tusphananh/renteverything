import {
  SearchAction,
  SearchTypes,
  searchScene,
  SearchState,
} from "../constants/SearchConstants";

const searchReducer = (
  state: SearchState,
  action: SearchAction
): SearchState => {
  switch (action.type) {
    case SearchTypes.SEARCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        isSearching: true,
      };
    case SearchTypes.SEARCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        results: action.payload?.results,
      };
    case SearchTypes.SEARCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload?.error,
      };
    case SearchTypes.CLEAR_RESULTS:
      return {
        ...state,
        results: [],
      };
    case SearchTypes.SEARCH_CANCEL:
      return {
        ...state,
        isSearching: false,
        isFetching: false,
        results: [],
      };

    case SearchTypes.ADD_SEARCH:
      return {
        ...state,
        searchs: [...state.searchs!, action.payload?.search!],
      };

    case SearchTypes.SET_CURRENT_POSITION:
      return {
        ...state,
        curPos: action.payload?.curPos!,
      };
    case SearchTypes.TO_INPUT_DETAILS_SCENE:
      return {
        ...state,
        searchScene: searchScene.INPUT_DETAILS,
      };
    case SearchTypes.TO_INPUT_LOCATION_SCENE:
      return {
        ...state,
        searchScene: searchScene.INPUT_LOCATION,
      };
    case SearchTypes.TO_RESULTS_SCENE:
      return {
        ...state,
        searchScene: searchScene.RESULTS,
      };
    case SearchTypes.SET_ADDRESS:
      return {
        ...state,
        address: action.payload?.address,
      };
    default:
      return state;
  }
};

export default searchReducer;
