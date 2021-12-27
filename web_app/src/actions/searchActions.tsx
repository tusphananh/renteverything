import { Position } from "../constants/DashBoardConstants";
import {
  SearchAction,
  SearchInterface,
  SearchTypes,
} from "../constants/SearchConstants";

export const setCurrentPosition = (position: Position): SearchAction => ({
  type: SearchTypes.SET_CURRENT_POSITION,
  payload: {
    curPos: position,
  },
});

export const searchRequest = (): SearchAction => ({
  type: SearchTypes.SEARCH_REQUEST,
});

export const searchCancel = (): SearchAction => ({
  type: SearchTypes.SEARCH_CANCEL,
});

export const toInputDetailsScene = (): SearchAction => ({
  type: SearchTypes.TO_INPUT_DETAILS_SCENE,
});

export const toInputLocationScene = (): SearchAction => ({
  type: SearchTypes.TO_INPUT_LOCATION_SCENE,
});

export const toResultsScene = (): SearchAction => ({
  type: SearchTypes.TO_RESULTS_SCENE,
});

export const setAddress = (address: string): SearchAction => ({
  type: SearchTypes.SET_ADDRESS,
  payload: {
    address,
  },
});

export const addSearch = (search: SearchInterface): SearchAction => ({
  type: SearchTypes.ADD_SEARCH,
  payload: {
    search,
  },
});
