import React, { useEffect } from "react";
import { SkeletonAnimation } from "../../animations/SearchAnimations";
import { MarkerType } from "../../constants/SearchConstants";
import { useSearchContext } from "../../contexts/searchContext";
import {
  addMarker,
  generateMarker,
  getMap,
  removeMarker,
} from "../../libs/mapbox";
import styles from "../../styles/Search.module.scss";
import { SearchController } from "./SearchController";
/**
 * Search component here
 */
const Search: React.FC<{
  isVisible: boolean;
}> = ({ isVisible }) => {
  const { searchState } = useSearchContext();
  const [map, setMap] = React.useState<mapboxgl.Map | null>(null);
  const [userMarker, setUserMarker] = React.useState<mapboxgl.Marker | null>(
    null
  );

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

      if (userMarker !== null) {
        userMarker.setLngLat([searchState.curPos.lng, searchState.curPos.lat]);
      } else {
        const marker = generateMarker(searchState.curPos, MarkerType.GREEN);
        setUserMarker(marker);
        addMarker(map, marker);
      }
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

export default React.memo(Search);
