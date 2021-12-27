import React, { useEffect } from "react";
import RecentLogo from "../../assets/icons/recent.svg";
import StreetViewIcon from "../../assets/icons/street-view.svg";
import {
  ActivitiesStatus,
  Activity,
} from "../../constants/ActivitiesConstants";
import { NearByItem } from "../../constants/HomeConstants";
import { SearchInterface } from "../../constants/SearchConstants";
import { useSearchContext } from "../../contexts/searchContext";
import { getDistance } from "../../libs/mapbox";
import styles from "../../styles/Home.module.scss";

const Home: React.FC<{
  activities?: Activity[];
}> = ({ activities }) => {
  return (
    <div className={styles["main"]}>
      <NearByBoard Icon={RecentLogo} />
      <RecentBoard Icon={StreetViewIcon} activities={activities} />
    </div>
  );
};

const RecentBoard: React.FC<{
  Icon: any;
  activities?: Activity[];
}> = ({ Icon, activities }) => {
  return (
    <div className={styles["board"]}>
      {/* Title Here */}
      <BoardHeader title={"Recent"} Icon={Icon} />
      {/* Render Items Here */}
      {/* {console.log(activities)} */}
      {activities &&
        activities.length > 0 &&
        activities.map((activity: Activity) => {
          return (
            <BoardItem
              key={activity.id}
              name={activity.item.name}
              description={activity.item.description}
              rightText={activity.startDate}
              status={activity.status}
            />
          );
        })}
    </div>
  );
};

const NearByBoard: React.FC<{
  Icon: any;
}> = ({ Icon }) => {
  const { searchState } = useSearchContext();
  const [searchs, setSeachs] = React.useState<NearByItem[]>([]);
  useEffect(() => {
    if (searchState.curPos && searchState.searchs) {
      const pos = searchState.curPos;
      searchState.searchs.forEach(async (search: SearchInterface) => {
        const distance = await getDistance(pos, {
          lat: search.lat,
          lng: search.lng,
        });

        const item: NearByItem = {
          distance,
          ...search,
        };

        setSeachs((prevState) => [...prevState, item]);
        console.log(item);
      });
    }
  }, [searchState.searchs, searchState.curPos]);

  return (
    <div className={styles["board"]}>
      {/* Title Here */}
      <BoardHeader title={"Nearby"} Icon={Icon} />
      {/* Render Items Here */}
      {searchs.map((search: NearByItem) => {
        return (
          <BoardItem
            key={search.id}
            name={search.name}
            rightText={(search.distance / 1000).toFixed(2) + " km"}
          />
        );
      })}
    </div>
  );
};

const BoardItem: React.FC<{
  name: string;
  description?: string;
  rightText: string;
  status?: ActivitiesStatus;
}> = ({ name, description, rightText, status }) => {
  const [statusStyle, setStatusStyle] = React.useState([
    styles["board__right"],
  ]);
  useEffect(() => {
    if (status === ActivitiesStatus.SUCCESS) {
      // statusStyle.push(styles["board__right--success"]);
      setStatusStyle((prev) => [...prev, styles["board__right--success"]]);
    } else if (status === ActivitiesStatus.FAILURE) {
      // statusStyle.push(styles["board__right--failure"]);
      setStatusStyle((prev) => [...prev, styles["board__right--failure"]]);
    } else if (status === ActivitiesStatus.PENDING) {
      // statusStyle.push(styles["board__right--pending"]);
      setStatusStyle((prev) => [...prev, styles["board__right--pending"]]);
    }
  }, [statusStyle]);
  return (
    <div className={styles["board__item"]}>
      <div className={styles["board-description"]}>
        <p className={styles["board-description__title"]}>{name}</p>
        <p className={styles["board-description__text"]}>{description}</p>
      </div>
      <div className={statusStyle.join(" ")}>
        <p className={styles["board-right__text"]}>{rightText}</p>
      </div>
    </div>
  );
};

const BoardHeader: React.FC<{
  title: string;
  Icon: any;
}> = ({ title, Icon }) => {
  return (
    <div className={styles["board__header"]}>
      <div className={styles["board-header__title"]}>
        <Icon className={styles["board-header-title__icon"]} />
        <p className={styles["board-header-title__text"]}>{title}</p>
      </div>
      <div className={styles["board-header__more"]}>
        <p className={styles["board-header-more__text"]}>show more</p>
      </div>
    </div>
  );
};

export default Home;
