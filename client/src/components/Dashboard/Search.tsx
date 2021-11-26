import React, { useEffect } from "react";
import { SkeletonAnimation } from "../../animations/SearchAnimations";
import { MarkerType } from "../../constants/SearchConstants";
import { useSearchContext } from "../../contexts/searchContext";
import { addMarker, getMap } from "../../libs/mapbox";
import styles from "../../styles/Search.module.scss";
import SearchIcon from "../../assets/icons/search.svg";
/**
 * Search component here
 */
const Search: React.FC<{
  isVisible: boolean;
}> = ({ isVisible }) => {
  const { searchState } = useSearchContext();
  const [map, setMap] = React.useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (isVisible && !map) {
      setMap(getMap());
    }
  }, [isVisible]);

  useEffect(() => {
    if (map && searchState.curPos) {
      map.flyTo({
        center: [searchState.curPos.lng, searchState.curPos.lat],
        zoom: 15,
      });
      addMarker(map, searchState.curPos, MarkerType.GREEN);
    }
  }, [map, searchState.curPos]);

  /**
   * Render the search component
   */
  return (
    <div className={isVisible ? styles["container"] : styles["hide"]}>
      {/* Loading... Skeleton */}
      <SkeletonAnimation
        className={styles["skeleton-loading"]}
        isVisible={searchState.curPos ? false : true}
      >
        <p>Loading Map...</p>
      </SkeletonAnimation>

      {/* Search Controller */}
      <SearchController />

      {/* Map */}
      <div
        id="map"
        className={
          searchState.curPos
            ? styles["map-container--actived"]
            : styles["map-container--disabled"]
        }
      ></div>
    </div>
  );
};

/**
 * SearchController component here
 */

const SearchController: React.FC<{}> = ({}) => {
  const [inputIsFocused, setInputIsFocused] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [inputRadius, setInputRadius] = React.useState<number>(1);
  return (
    <div className={styles["search-controller-container"]}>
      <div className={styles["search-controller__input-container"]}>
        {/* If input is not focused and input value is not empty, then show the placeholder */}
        <div
          className={
            !inputIsFocused && inputValue === ""
              ? styles["search-controller-input__placeholder"]
              : styles["hide"] +
                " " +
                styles["search-controller-input__placeholder"]
          }
        >
          <SearchIcon className={styles["search-controller-input__icon"]} />
          Input your item
        </div>
        <input
          className={styles["search-controller-input__input"]}
          onFocus={() => setInputIsFocused(true)}
          onBlur={() => setInputIsFocused(false)}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className={styles["search-controller__slider-container"]}>
        <p>Radius:</p>
        <p> &nbsp; {inputRadius} km &nbsp;</p>
        <input
          type="range"
          min="1"
          max="50"
          value={inputRadius}
          className={styles["search-controller__slider"]}
          onChange={(e) => {
            setInputRadius(Number(e.target.value));
          }}
        ></input>
      </div>

      <button className={styles["search-controller__search-btn"]}>
        Search
      </button>
    </div>
  );
};

export default React.memo(Search);
