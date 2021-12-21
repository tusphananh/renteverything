import {
  ActivitiesConstants,
  Activity,
} from "../constants/ActivitiesConstants";

export const requestActivities = () => ({
  type: ActivitiesConstants.ACTIVITIES_FETCH_MORE_REQUEST,
});

export const requestMoreActivities = () => ({
  type: ActivitiesConstants.ACTIVITIES_FETCH_MORE_REQUEST,
});

export const setActivitiesSuccess = (activities: Activity[]) => ({
  type: ActivitiesConstants.ACTIVITIES_FETCH_MORE_SUCCESS,
  payload: activities,
});

export const setActivitiesFailure = (error: string) => ({
  type: ActivitiesConstants.ACTIVITIES_FETCH_FAILURE,
  payload: error,
});

export const setMoreActivities = (activities: Activity[]) => ({
  type: ActivitiesConstants.ACTIVITIES_FETCH_MORE_SUCCESS,
  payload: activities,
});

export const setMoreActivitiesFailure = (error: string) => ({
  type: ActivitiesConstants.ACTIVITIES_FETCH_FAILURE,
  payload: error,
});
