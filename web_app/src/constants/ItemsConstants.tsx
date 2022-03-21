export enum FilterType {
  NAME = 'Name',
  PRICE = 'Price',
  REAL_VALUE = 'Real Value',
}

export enum SortType {
  ASC = 'Asc',
  DESC = 'Desc',
}

export type ItemMaybe = {
  __typename?: 'Item'
  id: string
  name: string
  description: string
  price: number
  realValue: number
}
