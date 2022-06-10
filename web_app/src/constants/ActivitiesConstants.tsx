import { Socket } from "socket.io-client";

export enum ActivitiesTypes {
  ADD_PROVIDE_ACTIVITY = "ADD_PROVIDE_ACTIVITY",
  ADD_PROVIDE_ACTIVITIES = "ADD_PROVIDE_ACTIVITIES",
  REMOVE_PROVIDE_ACTIVITY = "REMOVE_PROVIDE_ACTIVITY",
  ADD_RENT_ACTIVITY = "ADD_RENT_ACTIVITY",
  ADD_RENT_ACTIVITIES = "ADD_RENT_ACTIVITIES",
  REMOVE_RENT_ACTIVITY = "REMOVE_RENT_ACTIVITY",
  ADD_MESSAGE = "ADD_MESSAGE",
  SET_CHAT_SOCKET = "SET_CHAT_SOCKET",
  UPDATE_ACTIVITY = "UPDATE_ACTIVITY",
}

export enum ActivitiesStatus {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed",
  IN_PROGRESS = "in_progress",
}

export type ActivityMaybe = {
  __typename?: "Activity";
  id: string;
  name: string;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  itemRealValue: number;
  totalPrice: number;
  duration: number;
  distance: number;
  status: string;
  createdAt: any;
  updatedAt: any;
  provider: {
    __typename?: "User";
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  renter: {
    __typename?: "User";
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  chat: {
    __typename?: "Chat";
    id: string;
    title: string;
    createdAt: any;
    messages: Array<MessageMaybe>;
  };
};

export type ChatMaybe = {
  __typename?: "Chat";
  id: string;
  title: string;
  createdAt: any;
  messages: Array<MessageMaybe>;
};

export type MessageMaybe = {
  __typename?: "Message";
  id: string;
  createdAt: any;
  text: string;
  chatId: number;
  user: {
    __typename?: "User";
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
} | null;
export interface ActivitiesState {
  chatSocket?: Socket;
  rentActivities: ActivityMaybe[] | [];
  provideActivities: ActivityMaybe[] | [];
  isFetching: boolean;
  error?: string | null;
}

export interface AddProvideActivitiesAction {
  type: ActivitiesTypes.ADD_PROVIDE_ACTIVITIES;
  payload: {
    activities: ActivityMaybe[];
  };
}

export interface AddProvideActivityAction {
  type: ActivitiesTypes.ADD_PROVIDE_ACTIVITY;
  payload: {
    activity: ActivityMaybe;
  };
}

export interface RemoveProvideActivityAction {
  type: ActivitiesTypes.REMOVE_PROVIDE_ACTIVITY;
  payload: {
    activityId: string;
  };
}

export interface AddRentActivitiesAction {
  type: ActivitiesTypes.ADD_RENT_ACTIVITIES;
  payload: {
    activities: ActivityMaybe[];
  };
}

export interface AddRentActivityAction {
  type: ActivitiesTypes.ADD_RENT_ACTIVITY;
  payload: {
    activity: ActivityMaybe;
  };
}

export interface RemoveRentActivityAction {
  type: ActivitiesTypes.REMOVE_RENT_ACTIVITY;
  payload: {
    activityId: string;
  };
}

export interface AddMessageAction {
  type: ActivitiesTypes.ADD_MESSAGE;
  payload: {
    message?: MessageMaybe;
  };
}

export interface SetChatSocketAction {
  type: ActivitiesTypes.SET_CHAT_SOCKET;
  payload: {
    socket: Socket;
  };
}

export interface UpdateActivityAction {
  type: ActivitiesTypes.UPDATE_ACTIVITY;
  payload: {
    activity: ActivityMaybe;
  };
}

export type ActivitiesAction =
  | AddProvideActivitiesAction
  | AddProvideActivityAction
  | RemoveProvideActivityAction
  | AddRentActivitiesAction
  | AddRentActivityAction
  | RemoveRentActivityAction
  | AddMessageAction
  | SetChatSocketAction
  | UpdateActivityAction;
