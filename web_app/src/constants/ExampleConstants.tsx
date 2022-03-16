import { Item, User, UserResponse } from '../graphql-generated/graphql'
import { ActivitiesStatus, Activity } from './ActivitiesConstants'
import { ActivityMessage, Message, UsersMessage } from './MessageConstants'
import { SearchItem, SearchResult } from './SearchConstants'
import { v4 as uuidv4 } from 'uuid'
const item: Item = {
  id: '1',
  name: 'Item 1',
  description: 'Item 1 description',
  realValue: 10,
  price: 0,
}
const user: User = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  createdAt: '2020-01-01',
  phone: '1234567890',
  updatedAt: '2020-01-01',
  balance: 0,
  items: [],
}
export const activities: Activity[] = [
  {
    id: '1',
    status: ActivitiesStatus.PENDING,
    startDate: '2020-01-01',
    endDate: '2020-01-01',
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
    id: '2',
    status: ActivitiesStatus.SUCCESS,
    startDate: '2020-01-01',
    endDate: '2020-01-01',
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
    id: '3',
    status: ActivitiesStatus.FAILED,
    startDate: '2020-01-01',
    endDate: '2020-01-01',
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
]

export const searchs: SearchItem[] = [
  {
    id: '1',
    name: 'Shoes',
    socketId: '1',
    lng: 0,
    lat: 0,
    radius: 100,
    duration: 1,
    userId: '1',
  },
  {
    id: '2',
    name: 'Shoes',
    socketId: '2',
    lng: 0,
    lat: 0,
    radius: 100,
    duration: 1,
    userId: '1',
  },
]

export const responseEx: UserResponse = {
  code: 200,
  success: true,
  errors: [],
  data: user,
}

export const resultsEx: SearchResult[] = []

const text: Message = {
  id: '1',
  text: 'Hello',
  createdAt: '2020-01-01',
  user: user,
}

export const activitiesMessagesEx: ActivityMessage[] = [
  {
    id: uuidv4(),
    title: 'Activity 1',
    createdAt: '2020-01-01',
    text: [text],
  },
  {
    id: uuidv4(),
    title: 'Activity 2',
    createdAt: '2020-01-01',
    text: [text],
  },
]

export const usersMessagesEx: UsersMessage[] = [
  {
    id: uuidv4(),
    users: [user],
    createdAt: '2020-01-01',
    text: [text],
  },
  {
    id: uuidv4(),
    users: [user],
    createdAt: '2020-01-01',
    text: [text],
  },
]
