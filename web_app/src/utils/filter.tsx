import { FilterType, ItemMaybe, SortType } from '../constants/ItemsConstants'

export const filterItem = (
  root: ItemMaybe[],
  filterType: FilterType,
  sortType: SortType,
): ItemMaybe[] => {
  const newRoot = [...root]
  switch (filterType) {
    case FilterType.NAME:
      return sortType === SortType.ASC
        ? newRoot.sort((a, b) => a.name.localeCompare(b.name))
        : newRoot.sort((a, b) => b.name.localeCompare(a.name))
    case FilterType.PRICE:
      return sortType === SortType.ASC
        ? newRoot.sort((a, b) => a.price - b.price)
        : newRoot.sort((a, b) => b.price - a.price)
    case FilterType.REAL_VALUE:
      return sortType === SortType.ASC
        ? newRoot.sort((a, b) => a.realValue - b.realValue)
        : newRoot.sort((a, b) => b.realValue - a.realValue)

    default:
      return root
  }
}
