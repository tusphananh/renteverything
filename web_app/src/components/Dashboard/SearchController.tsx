import { selectionSetMatchesResult } from "@apollo/client/cache/inmemory/helpers";
import {
  AnimatePresence,
  AnimateSharedLayout,
  motion,
  Variants,
} from "framer-motion";
import mapboxgl from "mapbox-gl";
import React, { useEffect } from "react";
import {
  setAddress,
  setCurrentPosition,
  toInputDetailsScene,
  toInputLocationScene,
  toResultsScene,
} from "../../actions/searchActions";
import AngleLeftIcon from "../../assets/icons/angle-left.svg";
import LocationArrowIcon from "../../assets/icons/location-arrow.svg";
import LocationPickerIcon from "../../assets/icons/location-picker.svg";
import SearchIcon from "../../assets/icons/search.svg";
import { Position } from "../../constants/DashBoardConstants";
import { SearchAddress, searchScene } from "../../constants/SearchConstants";
import { useSearchContext } from "../../contexts/searchContext";
import { getGeocodings } from "../../libs/mapbox";
import styles from "../../styles/SearchController.module.scss";

/**
 * Framer motion animation variants
 */
const variants: Variants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
};

/**
 * SearchController component here
 */

export const SearchController: React.FC<{
  map: mapboxgl.Map | null;
}> = ({ map }) => {
  const { searchState } = useSearchContext();
  return (
    <AnimateSharedLayout>
      <AnimatePresence>
        <motion.div layout className={styles["search-controller-container"]}>
          {searchState.searchScene === searchScene.INPUT_DETAILS && (
            <SearchPanel></SearchPanel>
          )}
          {searchState.searchScene === searchScene.RESULTS && (
            <ResultsPanel map={map}></ResultsPanel>
          )}
          {searchState.searchScene === searchScene.INPUT_LOCATION && (
            <LocationPanel map={map}></LocationPanel>
          )}
        </motion.div>
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};

/**
/**
 * Search Panel component here
 */

const SearchPanel: React.FC<{}> = () => {
  const [inputIsFocused, setInputIsFocused] = React.useState<boolean>(false);
  const [nameValue, setNameValue] = React.useState<string>("");
  const [radiusValue, setRadiusValue] = React.useState<number>(1);
  const [hourValue, setHourValue] = React.useState<number>(0);
  const { searchState, searchDispatch, sendSearch } = useSearchContext();

  const search = () => {
    sendSearch(nameValue, radiusValue, hourValue);
    searchDispatch(toResultsScene());
  };

  const inputLocation = () => {
    searchDispatch(toInputLocationScene());
  };
  return (
    <motion.div
      layout
      className={styles["search-panel"]}
      variants={variants}
      initial="initial"
      animate="visible"
      exit="exit"
    >
      <div className={styles["search-panel__address-container"]}>
        <LocationArrowIcon />
        <button
          onClick={() => {
            inputLocation();
          }}
        >
          {searchState.address}
        </button>
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
    </motion.div>
  );
};

const LocationPanel: React.FC<{ map: mapboxgl.Map | null }> = ({ map }) => {
  const { searchState, searchDispatch } = useSearchContext();
  const [addressValue, setAddressValue] = React.useState(
    searchState.address?.toString()
  );
  const [results, setResults] = React.useState<SearchAddress[]>([]);

  const ressultsHandler = async () => {
    if (addressValue && searchState.curPos) {
      const rs = await getGeocodings(addressValue, searchState.curPos);
      setResults(rs);
    }
  };

  React.useEffect(() => {
    ressultsHandler();
  }, [addressValue]);
  return (
    <motion.div
      layout
      variants={variants}
      initial="initial"
      animate="visible"
      exit="exit"
      className={styles["location-panel-container"]}
    >
      <SearchNavigation map={map} />
      <motion.div
        layout
        variants={variants}
        initial="initial"
        animate="visible"
        exit="exit"
        className={styles["location-panel__address-container"]}
      >
        <LocationArrowIcon />
        <motion.input
          className={styles["location-panel__address-input"]}
          value={addressValue}
          onChange={(e) => {
            setAddressValue(e.target.value);
          }}
        />
      </motion.div>
      <div className={styles["location-panel__result-container"]}>
        {results.map((result) => {
          return (
            <motion.div
              key={result.id}
              layout
              variants={variants}
              initial="initial"
              animate="visible"
              exit="exit"
              className={styles["location-panel__result-item"]}
              onClick={() => {
                searchDispatch(setCurrentPosition(result.position));
                searchDispatch(setAddress(result.address));
                searchDispatch(toInputDetailsScene());
              }}
            >
              {" "}
              {result.address}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
/**
 * Result component here
 */
const ResultsPanel: React.FC<{ map: mapboxgl.Map | null }> = ({ map }) => {
  const { searchDispatch } = useSearchContext();
  const back = () => {
    searchDispatch(toInputDetailsScene());
  };
  return (
    <motion.div
      layout
      variants={variants}
      initial="initial"
      animate="visible"
      exit="exit"
      className={styles["result-panel-container"]}
    >
      <SearchNavigation map={map}></SearchNavigation>
      <p>Results</p>
      <button onClick={() => back()}>Back</button>
    </motion.div>
  );
};

/**
 * SearchNavigation component here
 */

const SearchNavigation: React.FC<{ map: mapboxgl.Map | null }> = ({ map }) => {
  const { searchState, searchDispatch } = useSearchContext();
  const [isPickingLocation, setIsPickingLocation] =
    React.useState<boolean>(false);
  const [pickedPosition, setPickedPosition] = React.useState<Position>();

  const back = () => {
    searchDispatch(toInputDetailsScene());
  };

  useEffect(() => {
    map?.on("click", (e) => {
      setPickedPosition(e.lngLat);
    });
  }, [map]);

  useEffect(() => {
    if (isPickingLocation) {
      if (pickedPosition) {
        searchDispatch(setCurrentPosition(pickedPosition));
        searchDispatch(toInputDetailsScene());
      }
    }
  }, [pickedPosition]);

  return (
    <motion.div
      layout
      variants={variants}
      initial="initial"
      animate="visible"
      exit="exit"
      className={styles["search-navigation-container"]}
    >
      <button
        className={styles["search-navigation__btn"]}
        onClick={() => {
          back();
        }}
      >
        <AngleLeftIcon />
        back
      </button>
      {searchState.searchScene === searchScene.INPUT_LOCATION && (
        <button
          className={styles["search-navigation__location-picker"]}
          data-is-picking={isPickingLocation}
          onClick={() => {
            setIsPickingLocation(!isPickingLocation);
          }}
        >
          <LocationPickerIcon />{" "}
        </button>
      )}
      {searchState.searchScene === searchScene.RESULTS && (
        <div className={styles["search-navigation__loader"]} />
      )}
    </motion.div>
  );
};
