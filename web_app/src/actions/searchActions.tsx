import { Position } from "../constants/DashBoardConstants";
import { SearchAction, SearchConstants } from "../constants/SearchConstants";

export const setCurrentPosition = (position: Position): SearchAction => ({
  type: SearchConstants.SET_CURRENT_POSITION,
  payload: {
    curPos: position,
  },
});

export const searchRequest = (): SearchAction => ({
  type: SearchConstants.SEARCH_REQUEST,
});

export const searchCancel = (): SearchAction => ({
  type: SearchConstants.SEARCH_CANCEL,
});

export const toInputDetailsScene = (): SearchAction => ({
  type: SearchConstants.TO_INPUT_DETAILS_SCENE,
});

export const toInputLocationScene = (): SearchAction => ({
  type: SearchConstants.TO_INPUT_LOCATION_SCENE,
});

export const toResultsScene = (): SearchAction => ({
  type: SearchConstants.TO_RESULTS_SCENE,
});

export const setAddress = (address: string): SearchAction => ({
  type: SearchConstants.SET_ADDRESS,
  payload: {
    address,
  },
});
