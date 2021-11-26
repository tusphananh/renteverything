import { Position } from "../constants/DashBoardConstants";
import { SearchAction, SearchConstants } from "../constants/SearchConstants";

export const setCurrentPosition = (position: Position): SearchAction => ({
  type: SearchConstants.SET_CURRENT_POSITION,
  payload: {
    curPos: position,
  },
});
