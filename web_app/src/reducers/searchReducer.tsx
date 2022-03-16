import {
  SearchAction,
  SearchTypes,
  searchScene,
  SearchState,
} from '../constants/SearchConstants'

const searchReducer = (
  state: SearchState,
  action: SearchAction,
): SearchState => {
  switch (action.type) {
    case SearchTypes.SEARCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        isSearching: true,
      }
    case SearchTypes.SEARCH_CANCEL:
      return {
        ...state,
        isSearching: false,
        isFetching: false,
        results: [],
      }

    case SearchTypes.ADD_NEAR_BY_ITEM:
      return {
        ...state,
        nearByItems: [...state.nearByItems!, action.payload?.nearByItem!],
      }

    case SearchTypes.REMOVE_NEAR_BY_ITEM:
      return {
        ...state,
        nearByItems: state.nearByItems!.filter(
          (item) => item.id !== action.payload?.id,
        ),
      }

    case SearchTypes.SET_CURRENT_POSITION:
      return {
        ...state,
        curPos: action.payload?.curPos!,
      }
    case SearchTypes.TO_INPUT_DETAILS_SCENE:
      return {
        ...state,
        searchScene: searchScene.INPUT_DETAILS,
      }
    case SearchTypes.TO_INPUT_LOCATION_SCENE:
      return {
        ...state,
        searchScene: searchScene.INPUT_LOCATION,
      }
    case SearchTypes.TO_RESULTS_SCENE:
      return {
        ...state,
        searchScene: searchScene.RESULTS,
      }
    case SearchTypes.SET_ADDRESS:
      return {
        ...state,
        address: action.payload?.address,
      }

    case SearchTypes.CONNECT_SEARCH_SOCKET:
      return {
        ...state,
        searchSocket: action.payload?.searchSocket,
      }
    case SearchTypes.CLEAR_NEAR_BY_ITEMS:
      return {
        ...state,
        nearByItems: [],
      }
    case SearchTypes.CLEAR_SOCKET:
      return {
        ...state,
        searchSocket: undefined,
      }
    case SearchTypes.ADD_RESULT:
      return {
        ...state,
        results: [...state.results!, action.payload?.result!],
      }
    case SearchTypes.REMOVE_RESULT:
      return {
        ...state,
        results: state.results!.filter(
          (result) => result.id !== action.payload?.id,
        ),
      }
    case SearchTypes.CLEAR_RESULTS:
      return {
        ...state,
        results: [],
      }
    case SearchTypes.ADD_SEARCH:
      return {
        ...state,
        search: action.payload?.search,
      }
    case SearchTypes.CLEAR_SEARCH:
      return {
        ...state,
        search: undefined,
      }

    default:
      return state
  }
}

export default searchReducer
