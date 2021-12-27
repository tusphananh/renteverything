import { Item, User, UserResponse } from "../graphql-generated/graphql";
import { ActivitiesStatus, Activity } from "./ActivitiesConstants";
import { SearchInterface } from "./SearchConstants";

const item: Item = {
  id: "1",
  name: "Item 1",
  description: "Item 1 description",
  price: 10,
  quantity: 1,
  userId: 1,
  imageUrl: "https://via.placeholder.com/150",
};
const user: User = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  createdAt: "2020-01-01",
  phone: "1234567890",
  updatedAt: "2020-01-01",
};
export const activities: Activity[] = [
  {
    id: "1",
    status: ActivitiesStatus.PENDING,
    startDate: "2020-01-01",
    endDate: "2020-01-01",
    item: item,
    provider: user,
    renter: user,
    providerLocation: {
      lng: 0,
      lat: 0,
    },
    renterLocation: {
      lng: 0,
      lat: 0,
    },
  },
  {
    id: "2",
    status: ActivitiesStatus.SUCCESS,
    startDate: "2020-01-01",
    endDate: "2020-01-01",
    item: item,
    provider: user,
    renter: user,
    providerLocation: {
      lng: 0,
      lat: 0,
    },
    renterLocation: {
      lng: 0,
      lat: 0,
    },
  },
  {
    id: "3",
    status: ActivitiesStatus.FAILURE,
    startDate: "2020-01-01",
    endDate: "2020-01-01",
    item: item,
    provider: user,
    renter: user,
    providerLocation: {
      lng: 0,
      lat: 0,
    },
    renterLocation: {
      lng: 0,
      lat: 0,
    },
  },
];

export const searchs: SearchInterface[] = [
  {
    id: "1",
    name: "Shoes",
    socketId: "1",
    lng: 0,
    lat: 0,
    radius: 100,
    duration: 1,
    userId: "1",
  },
  {
    id: "2",
    name: "Shoes",
    socketId: "2",
    lng: 0,
    lat: 0,
    radius: 100,
    duration: 1,
    userId: "1",
  },
];

export const responseEx: UserResponse = {
  code: 200,
  success: true,
  errors: [],
  data: user,
};
