import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import mapboxgl from "mapbox-gl";
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  clearResult,
  removeResult,
  setAddress,
  setCurrentPosition,
  toInputDetailsScene,
  toInputLocationScene,
  toResultsScene,
} from "../../../actions/searchActions";
import { variants } from "../../../animations/VariantAnimations";
import AngleLeftIcon from "../../../assets/icons/angle-left.svg";
import LocationArrowIcon from "../../../assets/icons/location-arrow.svg";
import LocationPickerIcon from "../../../assets/icons/location-picker.svg";
import SearchIcon from "../../../assets/icons/search.svg";
import { Position } from "../../../constants/DashBoardConstants";
import {
  SearchAddress,
  SearchItem,
  SearchResult,
  searchScene,
} from "../../../constants/SearchConstants";
import { useActivitiesContext } from "../../../contexts/activitiesContext";
import { useAuthContext } from "../../../contexts/authContext";
import { useSearchContext } from "../../../contexts/searchContext";
import { getGeocodings } from "../../../libs/mapbox";
import { capitalizeFirstLetter } from "../../../utils/formatter";
import styles from "./SearchController.module.scss";
import common from "../../../styles/common.module.scss";

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
        <motion.div
          layout
          variants={variants}
          initial="initial"
          animate="visible"
          exit="exit"
          className={styles["search-controller-container"]}
        >
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
  const { authState } = useAuthContext();
  const [error, setError] = React.useState<string>("");
  const search = () => {
    if (!authState.user?.isVerified) {
      setError("Please verify your account first");
    } else if (hourValue && nameValue && radiusValue) {
      setError("");
      const search: SearchItem = {
        name: nameValue,
        radius: radiusValue * 1000,
        duration: hourValue,
        id: uuidv4(),
        lat: searchState.curPos!.lat,
        lng: searchState.curPos!.lng,
        socketId: searchState.searchSocket!.id,
        userId: authState.user!.id,
      };
      sendSearch(search);
      searchDispatch(toResultsScene());
    }
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
      <motion.div layout className={styles["search-panel__address-container"]}>
        <LocationArrowIcon />
        <button
          onClick={() => {
            inputLocation();
          }}
        >
          {searchState.address}
        </button>
      </motion.div>
      <motion.div layout className={styles["search-panel__input-container"]}>
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
      </motion.div>
      <motion.div layout className={styles["search-panel__slider-container"]}>
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
            // console.log(changeLower);
          }}
        ></input>
      </motion.div>
      <motion.div layout className={styles["search-panel__duration-container"]}>
        <p>Duration</p>
        <input
          placeholder="Hour"
          className={styles["search-panel__duration-input"]}
          onChange={(e) => setHourValue(Number(e.target.value))}
        ></input>
      </motion.div>
      <motion.div className={styles["search-container"]}>
        {error !== "" && <motion.p className={common.error}>{error}</motion.p>}
        <motion.button
          layout
          className={styles["search-panel__search-btn"]}
          onClick={() => {
            search();
          }}
        >
          Search
        </motion.button>
      </motion.div>
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
  const { searchState } = useSearchContext();

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
      <motion.p
        layout
        variants={variants}
        initial="initial"
        animate="visible"
        exit="exit"
      >
        Results
      </motion.p>
      <motion.div
        layout
        variants={variants}
        initial="initial"
        animate="visible"
        exit="exit"
        className={styles["result-panel__result-container"]}
      >
        {searchState.results.map((result) => {
          return <ResultItem key={result.id} result={result} />;
        })}
      </motion.div>
    </motion.div>
  );
};

const ResultItem: React.FC<{ result: SearchResult }> = ({ result }) => {
  const [isExtended, setIsExtended] = React.useState(false);
  const { searchDispatch, sendSearchCancel } = useSearchContext();
  const { authState, subtractBalance } = useAuthContext();
  const { approveResult } = useActivitiesContext();
  const [error, setError] = React.useState<string>("");
  const approve = () => {
    const totalPrice = result.itemPrice * result.duration;
    if (authState.user!.balance >= totalPrice) {
      setError("");
      approveResult(result);
      subtractBalance(totalPrice);
      searchDispatch(clearResult());
      sendSearchCancel();
      searchDispatch(toInputDetailsScene());
    } else {
      setError("Balance should be greater than item price with duration");
    }
  };
  return (
    <>
      {error && <p className={common.error}>{error}</p>}
      <motion.div
        layout
        variants={variants}
        initial="initial"
        animate="visible"
        exit="exit"
        className={styles["result-item"]}
      >
        <motion.div
          layout
          className={styles["result-item-nested"]}
          onClick={() => setIsExtended(!isExtended)}
        >
          <div className={styles["result-title-container"]}>
            <p className={styles["result-title--left"]}>Name</p>
            <p className={styles["result-title--right"]}>
              {capitalizeFirstLetter(result.itemName)}
            </p>
          </div>
          <div className={styles["result-title-container"]}>
            <p className={styles["result-title--left"]}>Distance</p>
            <p className={styles["result-title--right"]}>
              {capitalizeFirstLetter(result.distance + " km")}
            </p>
          </div>
          <div className={styles["result-title-container"]}>
            <p className={styles["result-title--left"]}>Price</p>
            <p className={styles["result-title--right"]}>
              {capitalizeFirstLetter(result.itemPrice + " USD/hour")}
            </p>
          </div>
        </motion.div>

        {isExtended && (
          <AnimatePresence>
            <motion.div
              layout
              variants={variants}
              initial="initial"
              animate="visible"
              exit="exit"
              className={styles["result-extended-nested"]}
              onClick={() => {
                setIsExtended(!isExtended);
              }}
            >
              <div className={styles["result-title-container"]}>
                <p className={styles["result-title--left"]}>Description</p>
                <p className={styles["result-title--right"]}>
                  {result.itemDescription}
                </p>
              </div>
              <div className={styles["result-title-container"]}>
                <p className={styles["result-title--left"]}>Duration</p>
                <p className={styles["result-title--right"]}>
                  {result.duration === 1
                    ? result.duration + " hour"
                    : result.duration + " hours"}
                </p>
              </div>
              <div className={styles["result-title-container"]}>
                <p className={styles["result-title--left"]}>Real value</p>
                <p className={styles["result-title--right"]}>
                  {result.itemRealValue + " USD"}
                </p>
              </div>
              <div className={styles["result-title-container"]}>
                <p className={styles["result-title--left"]}>Total price</p>
                <p className={styles["result-title--right"]}>
                  {result.totalPrice + " USD"}
                </p>
              </div>
            </motion.div>
            <motion.div
              className={styles["result__extended"]}
              layout
              variants={variants}
              initial="initial"
              animate="visible"
              exit="exit"
            >
              <motion.div
                layout
                variants={variants}
                initial="initial"
                animate="visible"
                exit="exit"
                className={styles["result-extended__btn-container"]}
              >
                <button
                  className={styles["result-extended__btn-approve"]}
                  onClick={() => {
                    approve();
                  }}
                >
                  Approve
                </button>
                <button
                  className={styles["result-extended__btn-decline"]}
                  onClick={() => {
                    searchDispatch(removeResult(result.id));
                  }}
                >
                  Decline
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </>
  );
};

/**
 * SearchNavigation component here
 */

const SearchNavigation: React.FC<{ map: mapboxgl.Map | null }> = ({ map }) => {
  const { searchState, searchDispatch, sendSearchCancel } = useSearchContext();
  const [isPickingLocation, setIsPickingLocation] =
    React.useState<boolean>(false);
  const [pickedPosition, setPickedPosition] = React.useState<Position>();

  const back = () => {
    searchDispatch(clearResult());
    sendSearchCancel();
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
