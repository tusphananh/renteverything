import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import React, { Fragment, useEffect } from "react";
import { variants } from "../../../animations/VariantAnimations";
import {
  FilterType,
  ItemMaybe,
  SortType,
} from "../../../constants/ItemsConstants";
import { ConfirmInputValues } from "../../../constants/SearchConstants";
import { useAuthContext } from "../../../contexts/authContext";
import { filterItem } from "../../../utils/filter";
import styles from "./ItemPicker.module.scss";

const ItemPicker: React.FC<{
  importConfirmInputValues: (
    name: string,
    price: number,
    realValue: number,
    description: string
  ) => void;
  setChooseItemClicked: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ importConfirmInputValues, setChooseItemClicked }) => {
  const [addItemBoardVisible, setAddItemBoardVisible] = React.useState(false);
  const { authState } = useAuthContext();
  const [filteredItems, setFilteredItems] = React.useState<ItemMaybe[]>(
    authState.user!.items
  );
  useEffect(() => {
    setFilteredItems(authState.user!.items);
  }, [authState.user]);

  return (
    <motion.div className={styles.itemsTabContainer}>
      {addItemBoardVisible && (
        <AddItemBoard setAddItemBoardVisible={setAddItemBoardVisible} />
      )}

      <SearchBar
        setItemFiltered={setFilteredItems}
        setAddItemBoardVisible={setAddItemBoardVisible}
      />
      <div className={styles.devider} />
      <ItemBoard
        importConfirmInputValues={importConfirmInputValues}
        setChooseItemClicked={setChooseItemClicked}
        itemFiltered={filteredItems}
      />
    </motion.div>
  );
};

const SearchBar: React.FC<{
  setItemFiltered: React.Dispatch<React.SetStateAction<ItemMaybe[]>>;
  setAddItemBoardVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setAddItemBoardVisible, setItemFiltered }) => {
  const [filterExtended, setFilterExtended] = React.useState(false);
  const [sortExtended, setSortExtended] = React.useState(false);
  const [filterType, setFilterType] = React.useState<FilterType>(
    FilterType.NAME
  );
  const [sortType, setSortType] = React.useState<SortType>(SortType.ASC);
  const [searchValue, setSearchValue] = React.useState("");
  const { authState } = useAuthContext();
  useEffect(() => {
    // if search value equal '' or '    '
    if (searchValue.trim() === "") {
      const filteredByInput = authState.user!.items;
      setItemFiltered(filterItem(filteredByInput, filterType, sortType));
    } else {
      const filteredByInput = authState.user!.items.filter((item) => {
        return item.name.includes(searchValue);
      });
      setItemFiltered(filterItem(filteredByInput, filterType, sortType));
    }
  }, [searchValue, filterType, sortType]);

  return (
    <AnimateSharedLayout>
      <AnimatePresence>
        <motion.div layout className={styles.searchBarContainer}>
          <motion.input
            className={styles.searchBarInput}
            placeholder="Search your item"
            // value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          {/* Filter */}
          <motion.div
            layout
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
                  );
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
                  );
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
            <motion.button
              onClick={() => setAddItemBoardVisible(true)}
              className={styles.addBtn}
            >
              +
            </motion.button>
          </motion.div>
        </motion.div>
        <motion.div></motion.div>
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};
const AddItemBoard: React.FC<{
  setAddItemBoardVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setAddItemBoardVisible }) => {
  const [inputValue, setInputValue] = React.useState<ConfirmInputValues>();
  const { addItem } = useAuthContext();
  const confirm = () => {
    inputValue?.name &&
      inputValue?.price &&
      inputValue?.realValue &&
      inputValue?.description &&
      addItem(
        inputValue?.name,
        inputValue?.price,
        inputValue?.realValue,
        inputValue?.description
      );
    setAddItemBoardVisible(false);
  };

  return (
    <motion.div
      layout
      variants={variants}
      initial="zoomInital"
      animate="zoomVisible"
      exit="zoomExit"
      className={styles["addItemBoardLayout"]}
    >
      <motion.div layout className={styles["addItemBoard"]}>
        <div className={styles["addItemBoardHeader"]}>
          <p>Add new item</p>
          <button
            onClick={() => setAddItemBoardVisible(false)}
            className={styles.closeBtn}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className={styles["itemInformaitonContainer"]}>
          <div className={styles["itemInputContainer"]}>
            <p>Name</p>
            <input
              type="text"
              placeholder="Max 5 words"
              onChange={(e) => {
                setInputValue({ ...inputValue, name: e.target.value });
              }}
            />
          </div>
          <div className={styles["itemInputContainer"]}>
            <p>Pricing</p>
            <input
              type="text"
              placeholder="USD / hour"
              onChange={(e) => {
                setInputValue({
                  ...inputValue,
                  price: parseFloat(e.target.value),
                });
              }}
            />
          </div>
          <div className={styles["itemInputContainer"]}>
            <p>Real value</p>
            <input
              type="text"
              placeholder="USD"
              onChange={(e) => {
                setInputValue({
                  ...inputValue,
                  realValue: parseFloat(e.target.value),
                });
              }}
            />
          </div>
          <div className={styles["itemInputContainer"]}>
            <p>Description</p>
            <input
              type="text"
              placeholder="Max 10 words"
              onChange={(e) => {
                setInputValue({
                  ...inputValue,
                  description: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <button
          className={styles["itemAddBtn"]}
          onClick={() => {
            confirm();
          }}
        >
          <p>Confirm</p>
        </button>
      </motion.div>
    </motion.div>
  );
};
const ItemBoard: React.FC<{
  importConfirmInputValues: (
    name: string,
    price: number,
    realValue: number,
    description: string
  ) => void;
  setChooseItemClicked: React.Dispatch<React.SetStateAction<boolean>>;
  itemFiltered: ItemMaybe[];
}> = ({ itemFiltered, importConfirmInputValues, setChooseItemClicked }) => {
  return (
    <AnimateSharedLayout>
      <AnimatePresence>
        <motion.div className={styles.itemBoardContainer}>
          {itemFiltered.map((item) => (
            <ItemCard
              importConfirmInputValues={importConfirmInputValues}
              setChooseItemClicked={setChooseItemClicked}
              key={item.id}
              item={item}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};

const ItemCard: React.FC<{
  item: ItemMaybe;
  importConfirmInputValues: (
    name: string,
    price: number,
    realValue: number,
    description: string
  ) => void;
  setChooseItemClicked: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ item, importConfirmInputValues, setChooseItemClicked }) => {
  const [extendCard, setExtendCard] = React.useState(false);
  return (
    <motion.div
      layout
      variants={variants}
      initial="initial"
      animate="visible"
      exit="exit"
      className={styles.itemContainer}
      onClick={() => setExtendCard(!extendCard)}
    >
      <motion.p layout className={styles.itemInfoLeft}>
        Name
      </motion.p>
      <motion.p layout className={styles.itemInfoRight}>
        {item.name}
      </motion.p>

      {extendCard && (
        <Fragment>
          <motion.p layout className={styles.itemInfoLeft}>
            Price
          </motion.p>
          <motion.p layout className={styles.itemInfoRight}>
            {item.price}
          </motion.p>

          <motion.p layout className={styles.itemInfoLeft}>
            Real value
          </motion.p>
          <motion.p layout className={styles.itemInfoRight}>
            {item.realValue}
          </motion.p>

          <motion.p layout className={styles.itemInfoLeft}>
            Description
          </motion.p>
          <motion.p layout className={styles.itemInfoRight}>
            {item.description}
          </motion.p>
          <motion.button
            onClick={() => {
              importConfirmInputValues(
                item.name,
                item.price,
                item.realValue,
                item.description
              );
              setChooseItemClicked(false);
            }}
            layout
            className={styles.selectBtn}
          >
            Select
          </motion.button>
        </Fragment>
      )}
    </motion.div>
  );
};

export default ItemPicker;
