import { User } from "../graphql-generated/graphql";

export interface SearchItem {
    id: string;
    userId: string;
    socketId: string;
    name: string;
    lat: number;
    lng: number;
    duration: number;
    radius: number;
}

export interface SearchResult {
    searchId: string
    id: string
    providerPosition: Position
    provider: User
    name: string
    itemName: string
    itemPrice: number
    itemRealValue: number
    itemDescription: string
    totalPrice: number
    distance: number
    duration: number
}

export interface Position {
    lat: number
    lng: number
}