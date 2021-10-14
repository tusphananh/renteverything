import React, { useEffect } from "react";
import { Search } from "../../constants/SearchConstants";
import styles from "../../styles/Home.module.scss";
import {
  ActivitiesStatus,
  Activity,
} from "../../constants/ActivitiesConstants";
import StreetViewIcon from "../../assets/icons/street-view.svg";
import RecentLogo from "../../assets/icons/recent.svg";
const Home: React.FC<{
  searchs?: Search[];
  activities?: Activity[];
}> = ({ searchs, activities }) => {
  return (
    <div className={styles["main"]}>
      <NearByBoard Icon={RecentLogo} searchs={searchs} />
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
      {activities &&
        activities.length > 0 &&
        activities.map((activity: Activity) => {
          return (
            <BoardItem
              name={activity.name}
              description={activity.description}
              rightText={activity.startDate}
            />
          );
        })}
    </div>
  );
};

const NearByBoard: React.FC<{
  Icon: any;
  searchs?: Search[];
}> = ({ Icon, searchs }) => {
  return (
    <div className={styles["board"]}>
      {/* Title Here */}
      <BoardHeader title={"Nearby"} Icon={Icon} />
      {/* Render Items Here */}
      {searchs &&
        searchs.length > 0 &&
        searchs.map((search: Search) => {
          const distance = "";
          return (
            <BoardItem
              name={search.name}
              description={search.description}
              rightText={distance}
            />
          );
        })}
    </div>
  );
};

const BoardItem: React.FC<{
  name: string;
  description: string;
  rightText: string;
  status?: ActivitiesStatus;
}> = ({ name, description, rightText, status }) => {
  const [statusStyle] = React.useState([styles["board__right"]]);
  useEffect(() => {
    if (status === ActivitiesStatus.SUCCESS) {
      statusStyle.push(styles["board-right--success"]);
    } else if (status === ActivitiesStatus.FAILURE) {
      statusStyle.push(styles["board-right--failure"]);
    } else if (status === ActivitiesStatus.PENDING) {
      statusStyle.push(styles["board-right--pending"]);
    }
  }, []);
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
