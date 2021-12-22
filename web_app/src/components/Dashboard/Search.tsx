import React, { useEffect } from "react";
import {
  ResultsPanelAnimation,
  SearchPanelAnimation,
  SkeletonAnimation,
} from "../../animations/SearchAnimations";
import { MarkerType } from "../../constants/SearchConstants";
import { useSearchContext } from "../../contexts/searchContext";
import { addMarker, getMap } from "../../libs/mapbox";
import styles from "../../styles/Search.module.scss";
import SearchIcon from "../../assets/icons/search.svg";
import LocationArrowIcon from "../../assets/icons/location-arrow.svg";
import { searchCancel, searchRequest } from "../../actions/searchActions";
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
  const { searchState } = useSearchContext();
  return (
    <div className={styles["search-controller-container"]}>
      <SearchPanel isVisible={!searchState.isSearching}></SearchPanel>
      <ResultsPanel isVisible={searchState.isSearching!}></ResultsPanel>
    </div>
  );
};

/**
 * Search Label component here
 */

const SearchPanel: React.FC<{
  isVisible: boolean;
}> = (props) => {
  const [inputIsFocused, setInputIsFocused] = React.useState<boolean>(false);
  const [nameValue, setNameValue] = React.useState<string>("");
  const [radiusValue, setRadiusValue] = React.useState<number>(1);
  const [hourValue, setHourValue] = React.useState<number>(0);
  const { searchState, searchDispatch } = useSearchContext();
  const search = () => {
    searchDispatch(searchRequest());
  };
  return (
    <SearchPanelAnimation
      className={styles["search-panel"]}
      isVisible={props.isVisible}
    >
      <div className={styles["search-panel__address-container"]}>
        <LocationArrowIcon />
        <button>{searchState.address}</button>
      </div>
      <div className={styles["search-panel__input-container"]}>
        {/* If input is not focused and input value is not empty, then show the placeholder */}
        <div
          className={
            !inputIsFocused && nameValue === ""
              ? styles["search-panel-input__placeholder"]
              : styles["hide"] + " " + styles["search-panel-input__placeholder"]
          }
        >
          <SearchIcon className={styles["search-panel-input__icon"]} />
          Input your item
        </div>
        <input
          className={styles["search-panel-input__input"]}
          onFocus={() => setInputIsFocused(true)}
          onBlur={() => setInputIsFocused(false)}
          onChange={(e) => setNameValue(e.target.value)}
        />
      </div>
      <div className={styles["search-panel__slider-container"]}>
        <div className={styles["search-panel__radius-container"]}>
          <p>Radius:</p>
          <p> &nbsp; {radiusValue} km &nbsp;</p>
        </div>
        <input
          type="range"
          min="1"
          max="30"
          value={radiusValue}
          className={styles["search-panel__slider"]}
          onChange={(e) => {
            setRadiusValue(Number(e.target.value));
            /**
             * Fill the color fo the left side of the slider
             */
            const changeLower = `linear-gradient(to right, #34AE73 0%, #34AE73 ${
              (parseInt(e.target.value) * 100) / 30
            }%, rgba(255, 255, 255, 0.3) ${
              (parseInt(e.target.value) * 100) / 30
            }%, rgba(255, 255, 255, 0.3) 100%)`;
            e.target.style.background = changeLower;
            console.log(changeLower);
          }}
        ></input>
      </div>
      <div className={styles["search-panel__duration-container"]}>
        <p>Duration</p>
        <input
          placeholder="Hour"
          className={styles["search-panel__duration-input"]}
          onChange={(e) => setHourValue(Number(e.target.value))}
        ></input>
      </div>
      <button
        className={styles["search-panel__search-btn"]}
        onClick={() => {
          search();
        }}
      >
        Search
      </button>
    </SearchPanelAnimation>
  );
};

/**
 * Result component here
 */
const ResultsPanel: React.FC<{
  isVisible: boolean;
}> = ({ isVisible }) => {
  const { searchDispatch } = useSearchContext();
  const back = () => {
    searchDispatch(searchCancel());
  };
  return (
    <ResultsPanelAnimation
      className={styles["results-panel"]}
      isVisible={isVisible}
    >
      <p>Results</p>
      <button onClick={() => back()}>Back</button>
    </ResultsPanelAnimation>
  );
};

export default React.memo(Search);
