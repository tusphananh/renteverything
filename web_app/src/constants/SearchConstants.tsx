import { Item, User } from "../graphql-generated/graphql";
import { Position } from "./DashBoardConstants";
import { Socket } from "socket.io-client";

export enum SearchConstants {
  CLEAR_RESULTS = "CLEAR_RESULTS",
  SEARCH_REQUEST = "SEARCH_REQUEST",
  SEARCH_SUCCESS = "SEARCH_SUCCESS",
  SEARCH_FAILURE = "SEARCH_FAILURE",
  SEARCH_CANCEL = "SEARCH_CANCEL",
  SET_CURRENT_POSITION = "SET_CURRENT_POSITION",
  TO_INPUT_DETAILS_SCENE = "TO_INPUT_DETAILS_SCENE",
  TO_INPUT_LOCATION_SCENE = "TO_INPUT_LOCATION_SCENE",
  TO_RESULTS_SCENE = "TO_RESULTS_SCENE",
  SET_ADDRESS = "SET_ADDRESS",
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
  socket?: Socket;
  searchs?: Search[] | [];
  results?: SearchResult[] | [];
  isFetching?: boolean;
  isSearching?: boolean;
  error?: string | null;
  curPos?: Position | undefined | null;
  address?: string | null;
  searchScene?: searchScene;
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

export enum searchScene {
  INPUT_DETAILS = "INPUT_DETAILS",
  INPUT_LOCATION = "INPUT_LOCATION",
  RESULTS = "RESULTS",
}

export interface SearchAddress {
  address: string;
  position: Position;
}
