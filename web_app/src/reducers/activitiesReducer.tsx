import {
  ActivitiesTypes,
  ActivitiesState,
  ActivitiesAction,
} from "../constants/ActivitiesConstants";

const activitiesReducer = (
  state: ActivitiesState,
  action: ActivitiesAction
): ActivitiesState => {
  switch (action.type) {
    case ActivitiesTypes.ACTIVITIES_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ActivitiesTypes.ACTIVITIES_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        activities: action.payload?.activities,
        error: null,
      };
    case ActivitiesTypes.ACTIVITIES_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload?.error,
      };
    case ActivitiesTypes.ACTIVITIES_FETCH_MORE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ActivitiesTypes.ACTIVITIES_FETCH_MORE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        activities: [...state.activities!, ...action.payload?.activities!],
        error: null,
      };
    case ActivitiesTypes.ACTIVITIES_FETCH_MORE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload?.error,
      };
    default:
      return state;
  }
};
export default activitiesReducer;
// Language: typescript
