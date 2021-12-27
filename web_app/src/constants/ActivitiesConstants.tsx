import { Item, User } from "../graphql-generated/graphql";

export enum ActivitiesTypes {
  ACTIVITIES_FETCH_REQUEST = "ACTIVITIES_FETCH_REQUEST",
  ACTIVITIES_FETCH_SUCCESS = "ACTIVITIES_FETCH_SUCCESS",
  ACTIVITIES_FETCH_FAILURE = "ACTIVITIES_FETCH_FAILURE",
  ACTIVITIES_FETCH_MORE_REQUEST = "ACTIVITIES_FETCH_MORE_REQUEST",
  ACTIVITIES_FETCH_MORE_SUCCESS = "ACTIVITIES_FETCH_MORE_SUCCESS",
  ACTIVITIES_FETCH_MORE_FAILURE = "ACTIVITIES_FETCH_MORE_FAILURE",
}

export enum ActivitiesStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
}

export interface ActivitiesState {
  activities?: Activity[] | [];
  isFetching?: boolean;
  error?: string | null;
}

export interface ActivitiesAction {
  type: ActivitiesTypes;
  payload?: ActivitiesState;
}

export interface Activity {
  id: string;
  startDate: string;
  endDate: string;
  providerLocation: {
    lng: number;
    lat: number;
  };
  renterLocation: {
    lng: number;
    lat: number;
  };
  renter: User;
  provider: User;
  item: Item;
  status: ActivitiesStatus;
}
