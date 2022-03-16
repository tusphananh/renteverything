export enum TabName {
  NEAR_BY = "Near By",
  MESSAGES = "Messages",
  ITEMS = "Items",
  ACTIVITIES = "Activities",
  SEARCH = "Search",
}

export interface Position {
  lng: number;
  lat: number;
}

export interface ConfirmBoardState {
  visible: boolean;
  name: string;
  duration: number;
  route_duration: number;
  id: string;
  distance: number;
}
