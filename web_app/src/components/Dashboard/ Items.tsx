import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import React from 'react'
import { variants } from '../../animations/VariantAnimations'
import { FilterType, SortType } from '../../constants/ItemsConstants'
import { useAuthContext } from '../../contexts/authContext'
import { Item } from '../../graphql-generated/graphql'
import styles from '../../styles/Items.module.scss'
function Items() {
  return (
    <motion.div
      layout
      variants={variants}
      initial="initial"
      animate="visible"
      exit="exit"
      className={styles.itemsTabContainer}
    >
      <AnimateSharedLayout>
        <AnimatePresence>
          <SearchBar />
          <ItemBoard />
        </AnimatePresence>
      </AnimateSharedLayout>
    </motion.div>
  )
}

const SearchBar: React.FC<{}> = ({}) => {
  const [filterExtended, setFilterExtended] = React.useState(false)
  const [sortExtended, setSortExtended] = React.useState(false)
  const [filterType, setFilterType] = React.useState<FilterType>(FilterType.ALL)
  const [sortType, setSortType] = React.useState<SortType>(SortType.ASC)
  return (
    <motion.div layout className={styles.searchBarContainer}>
      <motion.input
        className={styles.searchBarInput}
        placeholder="Search your item"
      />

      {/* Filter */}
      <motion.div
        className={styles.searchFilterContainer}
        onClick={() => setFilterExtended(!filterExtended)}
      >
        <motion.div
          layout
          variants={variants}
          initial="initial"
          animate="visible"
          exit="exit"
          className={styles.searchFilter}
        >
          {filterExtended ? (
            Object.values(FilterType).map((key) => {
              return (
                <AnimatePresence>
                  <motion.div
                    layout
                    variants={variants}
                    initial="initial"
                    animate="visible"
                    exit="exit"
                    onClick={() => setFilterType(key)}
                    className={styles.filterItem}
                  >
                    {key}
                  </motion.div>
                </AnimatePresence>
              )
            })
          ) : (
            <motion.p
              layout
              variants={variants}
              initial="initial"
              animate="visible"
              exit="exit"
              className={styles.filterItem}
            >
              {filterType}
            </motion.p>
          )}
        </motion.div>
      </motion.div>

      {/* Sort */}
      <motion.div
        className={styles.searchFilterContainer}
        onClick={() => setSortExtended(!sortExtended)}
      >
        <motion.div
          layout
          variants={variants}
          initial="initial"
          animate="visible"
          exit="exit"
          className={styles.searchFilter}
        >
          {sortExtended ? (
            Object.values(SortType).map((key) => {
              return (
                <AnimatePresence>
                  <motion.div
                    layout
                    variants={variants}
                    initial="initial"
                    animate="visible"
                    exit="exit"
                    onClick={() => setSortType(key)}
                    className={styles.filterItem}
                  >
                    {key}
                  </motion.div>
                </AnimatePresence>
              )
            })
          ) : (
            <motion.p
              layout
              variants={variants}
              initial="initial"
              animate="visible"
              exit="exit"
              className={styles.filterItem}
            >
              {sortType}
            </motion.p>
          )}
        </motion.div>
      </motion.div>
      <motion.div layout>
        <motion.button className={styles.addBtn}>+</motion.button>
      </motion.div>
    </motion.div>
  )
}

const ItemBoard: React.FC<{}> = ({}) => {
  const [items, setItems] = React.useState<Item[]>([])
  const { authState } = useAuthContext()
  React.useEffect(() => {
    authState.user && setItems(authState.user.items)
  }, [authState.user])

  return (
    <motion.div className={styles.itemBoardContainer}>
      {items.map((item) => (
        <ItemCard item={item} />
      ))}
    </motion.div>
  )
}

const ItemCard: React.FC<{ item: Item }> = ({ item }) => {
  return <motion.div className={styles.itemContainer}></motion.div>
}

export default Items
