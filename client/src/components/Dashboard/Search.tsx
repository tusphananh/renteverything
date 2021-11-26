import React, { useEffect } from "react";
import { SkeletonAnimation } from "../../animations/SearchAnimations";
import { Position } from "../../constants/DashBoardConstants";
import { MarkerType } from "../../constants/SearchConstants";
import { useSearchContext } from "../../contexts/searchContext";
import { addMarker, getMap } from "../../libs/mapbox";
import styles from "../../styles/Search.module.scss";

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

  return (
    <div className={isVisible ? styles["container"] : styles["hide"]}>
      {/* Loading... Skeleton */}
      <SkeletonAnimation
        className={styles["skeleton-loading"]}
        isVisible={searchState.curPos ? false : true}
      >
        <p>Loading Map...</p>
      </SkeletonAnimation>

      {/* Attribute Controller */}

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

const AttributeController: React.FC<{}> = ({}) => {
  return (
    <div className={styles["attribute-controller"]}>
      <div className={styles["attribute-controller__zoom-container"]}>
        <div className={styles["attribute-controller__btn"]}></div>
        <div className={styles["attribute-controller__btn"]}></div>
      </div>
      <div className={styles["attribute-controller__location-container"]}>
        <div className={styles["attribute-controller__btn"]}></div>
      </div>
    </div>
  );
};

export default React.memo(Search);
