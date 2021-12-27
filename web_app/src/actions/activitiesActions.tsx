import {
  ActivitiesTypes,
  Activity,
} from "../constants/ActivitiesConstants";

export const requestActivities = () => ({
  type: ActivitiesTypes.ACTIVITIES_FETCH_MORE_REQUEST,
});

export const requestMoreActivities = () => ({
  type: ActivitiesTypes.ACTIVITIES_FETCH_MORE_REQUEST,
});

export const setActivitiesSuccess = (activities: Activity[]) => ({
  type: ActivitiesTypes.ACTIVITIES_FETCH_MORE_SUCCESS,
  payload: activities,
});

export const setActivitiesFailure = (error: string) => ({
  type: ActivitiesTypes.ACTIVITIES_FETCH_FAILURE,
  payload: error,
});

export const setMoreActivities = (activities: Activity[]) => ({
  type: ActivitiesTypes.ACTIVITIES_FETCH_MORE_SUCCESS,
  payload: activities,
});

export const setMoreActivitiesFailure = (error: string) => ({
  type: ActivitiesTypes.ACTIVITIES_FETCH_FAILURE,
  payload: error,
});
