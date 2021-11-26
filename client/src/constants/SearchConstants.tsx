import { Item, User } from "../graphql-generated/graphql";
import { Position } from "./DashBoardConstants";

export enum SearchConstants {
  RESULT_FETCH_MORE_SUCCESS = "RESULT_FETCH_MORE_SUCCESS",
  RESULT_FETCH_MORE_FAILURE = "RESULT_FETCH_MORE_FAILURE",
  RESULT_FETCH_MORE_REQUEST = "RESULT_FETCH_MORE_REQUEST",
  RESULT_CLEAR = "RESULT_CLEAR",
  SEARCH_FETCH_REQUEST = "SEARCH_REQUEST",
  SEARCH_FETCH_SUCCESS = "SEARCH_SUCCESS",
  SEARCH_FETCH_FAILURE = "SEARCH_FAILURE",
  SEARCH_FETCH_MORE_SUCCESS = "SEARCH_FETCH_MORE_SUCCESS",
  SEARCH_FETCH_MORE_FAILURE = "SEARCH_FETCH_MORE_FAILURE",
  SET_CURRENT_POSITION = "SET_CURRENT_POSITION",
}

export interface Search {
  id: string;
  name: string;
  description: string;
  renterPosition: {
    lat: number;
    lng: number;
  };
  renter: User;
  distance: number;
}

export interface SearchResult {
  name: string;
  description: string;
  renterPosition: {
    lat: number;
    lng: number;
  };
  providerPosition: {
    lat: number;
    lng: number;
  };
  provider: User;
  renter: User;
  item: Item;
}

export interface SearchState {
  searchs?: Search[] | [];
  results?: SearchResult[] | [];
  isFetching?: boolean;
  isSearching?: boolean;
  error?: string | null;
  curPos: Position | undefined | null;
}

export interface SearchAction {
  type: SearchConstants;
  payload?: SearchState;
}

export enum searchAnimationVariantsName {
  HIDDEN = "HIDDEN",
  VISIBLE = "VISIBLE",
}

export enum MarkerType {
  GREEN = "GREEN",
  RED = "RED",
}
