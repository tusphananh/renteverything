import Image from "next/image";
import React, { useEffect } from "react";
import CalenderIcon from "../../assets/icons/calender.svg";
import HomeIcon from "../../assets/icons/home.svg";
import ItemsIcon from "../../assets/icons/items.svg";
import LogoutIcon from "../../assets/icons/logout.svg";
import MessageIcon from "../../assets/icons/messages.svg";
import NotiIcon from "../../assets/icons/noti.svg";
import SearchIcon from "../../assets/icons/signal-stream.svg";
import { TabName } from "../../constants/DashBoardConstants";
import { useActivitiesContext } from "../../contexts/activitiesContext";
import { useSearchContext } from "../../contexts/searchContext";
import { User } from "../../graphql-generated/graphql";
import styles from "../../styles/DashBoard.module.scss";
import Activities from "./ Activities";
import Items from "./ Items";
import Home from "./Home";
import Message from "./Message";
import Search from "./Search";
const user: User = {
  id: "1",
  lastName: "Tu",
  firstName: "John",
  phone: "555-555-5555",
  createdAt: "2020-01-01T00:00:00.000Z",
  updatedAt: "2020-01-01T00:00:00.000Z",
};

function Dashboard() {
  const [activeTabName, setTabName] = React.useState<TabName>(TabName.HOME);
  const { searchState } = useSearchContext();
  const { activitiesState } = useActivitiesContext();
  const [mainBoard, setMainBoard] = React.useState<JSX.Element>();
  const [boards] = React.useState({
    home: (
      <Home
        key={TabName.HOME}
        searchs={searchState.searchs}
        activities={activitiesState.activities}
      />
    ),
    message: <Message key={TabName.MESSAGES} />,
    activities: <Activities key={TabName.ACTIVITIES} />,
    items: <Items key={TabName.ITEMS} />,
  });
  useEffect(() => {
    if (activeTabName === TabName.HOME) {
      setMainBoard(boards.home);
    } else if (activeTabName === TabName.MESSAGES) {
      setMainBoard(boards.message);
    } else if (activeTabName === TabName.ACTIVITIES) {
      setMainBoard(boards.activities);
    } else if (activeTabName === TabName.ITEMS) {
      setMainBoard(boards.items);
    } else {
      setMainBoard(<></>);
    }
  }, [activeTabName, searchState, activitiesState]);

  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <div className={styles["header__avatar"]}>
          <Image
            src={`https://avatars.dicebear.com/api/avataaars/${
              user.firstName + user.lastName
            }.svg`}
            width="42px"
            height="42px"
            alt="avatar"
          />
        </div>
        <p className={styles["header__name"]}>{activeTabName}</p>
        <div className={styles["header__noti"]}>
          <NotiIcon width="42px" height="42px" alt="notification" />
        </div>
      </div>
      <div className={styles["main"]}>
        <div className={styles["navbar"]}>
          <NavbarItem
            activeTabName={activeTabName}
            tabName={TabName.HOME}
            name="Home"
            onClick={() => setTabName(TabName.HOME)}
          >
            <HomeIcon alt="Home" />
          </NavbarItem>
          <NavbarItem
            activeTabName={activeTabName}
            tabName={TabName.ACTIVITIES}
            name="Activities"
            onClick={() => setTabName(TabName.ACTIVITIES)}
          >
            <CalenderIcon alt="Activities" />
          </NavbarItem>
          <NavbarItem
            activeTabName={activeTabName}
            tabName={TabName.SEARCH}
            name="Search"
            onClick={() => setTabName(TabName.SEARCH)}
          >
            <SearchIcon alt="Search" transform="scale(1.8)" />
          </NavbarItem>
          <NavbarItem
            activeTabName={activeTabName}
            tabName={TabName.MESSAGES}
            name="Message"
            onClick={() => setTabName(TabName.MESSAGES)}
          >
            <MessageIcon alt="Message" />
          </NavbarItem>
          <NavbarItem
            activeTabName={activeTabName}
            tabName={TabName.ITEMS}
            name="Items"
            onClick={() => setTabName(TabName.ITEMS)}
          >
            <ItemsIcon alt="Items" />
          </NavbarItem>

          <button className={styles["navbar__item-logout"]}>
            <div className={styles["navbar-item-logo"]}>
              <LogoutIcon alt="Logout" />
            </div>
            <p className={styles["navbar-item-name"]}>Log out</p>
          </button>
        </div>
        <div className={styles["dashboard"]}>
          {mainBoard}
          <Search isVisible={activeTabName === TabName.SEARCH} />
        </div>
      </div>
    </div>
  );
}

const NavbarItem: React.FC<{
  tabName: TabName;
  activeTabName: TabName;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  name: string;
}> = ({ activeTabName, tabName, children, onClick, name }) => {
  return (
    <button
      onClick={onClick}
      className={
        activeTabName === tabName
          ? styles["navbar__item--active"]
          : styles["navbar__item--inactive"]
      }
    >
      <div className={styles["navbar-item-logo"]}>{children}</div>
      <p className={styles["navbar-item-name"]}>{name}</p>
    </button>
  );
};

export default Dashboard;
