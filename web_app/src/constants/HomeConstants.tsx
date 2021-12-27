import { SearchInterface } from "./SearchConstants";

export interface NearByItem extends SearchInterface {
  distance: number;
}
