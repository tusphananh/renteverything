import Image from "next/image";
import React, { useEffect } from "react";
import CalenderIcon from "../../assets/icons/calender.svg";
import HomeIcon from "../../assets/icons/home.svg";
import ItemsIcon from "../../assets/icons/items.svg";
import LogoutIcon from "../../assets/icons/logout.svg";
import MessageIcon from "../../assets/icons/messages.svg";
import NotiIcon from "../../assets/icons/noti.svg";
import SearchIcon from "../../assets/icons/signal-stream.svg";
import { DashBoardTabName } from "../../constants/DashBoardConstants";
import { useAuthContext } from "../../contexts/authContext";
import { User } from "../../graphql-generated/graphql";
import Activities from "./Activities/ Activities";
import styles from "./DashBoard.module.scss";
import Items from "./Items/ Items";
import Message from "./Message/Message";
import NearBy from "./NearBy/NearBy";
import Search from "./Search/Search";

function Dashboard() {
  const [activeTabName, setTabName] = React.useState<DashBoardTabName>(
    DashBoardTabName.NEAR_BY
  );
  const [mainBoard, setMainBoard] = React.useState<JSX.Element>();

  const { authState } = useAuthContext();
  const [user, setUser] = React.useState<User>();
  const [boards] = React.useState({
    home: <NearBy key={DashBoardTabName.NEAR_BY} />,
    message: <Message key={DashBoardTabName.MESSAGES} />,
    activities: <Activities key={DashBoardTabName.ACTIVITIES} />,
    items: <Items key={DashBoardTabName.ITEMS} />,
  });

  useEffect(() => {
    authState.user && setUser(authState.user);
  }, [authState.user]);

  useEffect(() => {
    if (activeTabName === DashBoardTabName.NEAR_BY) {
      setMainBoard(boards.home);
    } else if (activeTabName === DashBoardTabName.MESSAGES) {
      setMainBoard(boards.message);
    } else if (activeTabName === DashBoardTabName.ACTIVITIES) {
      setMainBoard(boards.activities);
    } else if (activeTabName === DashBoardTabName.ITEMS) {
      setMainBoard(boards.items);
    } else {
      setMainBoard(<></>);
    }
  }, [activeTabName]);

  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <div className={styles["header__avatar"]}>
          <Image
            src={`https://avatars.dicebear.com/api/avataaars/${
              user && user.firstName + user.lastName
            }.svg`}
            width="42px"
            height="42px"
            alt="avatar"
          />
        </div>

        <a className={styles["header__user-info-container"]} href="/account">
          <p> {user && user.firstName + " " + user.lastName}</p>
          <p>{user && user.balance + " USD"}</p>
        </a>

        <p className={styles["header__name"]}>{activeTabName}</p>
        <div className={styles["header__noti"]}>
          <NotiIcon width="42px" height="42px" alt="notification" />
        </div>
      </div>
      <div className={styles["main"]}>
        <div className={styles["navbar"]}>
          <NavbarItem
            activeTabName={activeTabName}
            tabName={DashBoardTabName.NEAR_BY}
            name="Near By"
            onClick={() => setTabName(DashBoardTabName.NEAR_BY)}
          >
            <HomeIcon alt="Near By" />
          </NavbarItem>
          <NavbarItem
            activeTabName={activeTabName}
            tabName={DashBoardTabName.ACTIVITIES}
            name="Activities"
            onClick={() => setTabName(DashBoardTabName.ACTIVITIES)}
          >
            <CalenderIcon alt="Activities" />
          </NavbarItem>
          <NavbarItem
            activeTabName={activeTabName}
            tabName={DashBoardTabName.SEARCH}
            name="Search"
            onClick={() => setTabName(DashBoardTabName.SEARCH)}
          >
            <SearchIcon alt="Search" transform="scale(1.8)" />
          </NavbarItem>
          <NavbarItem
            activeTabName={activeTabName}
            tabName={DashBoardTabName.MESSAGES}
            name="Message"
            onClick={() => setTabName(DashBoardTabName.MESSAGES)}
          >
            <MessageIcon alt="Message" />
          </NavbarItem>
          <NavbarItem
            activeTabName={activeTabName}
            tabName={DashBoardTabName.ITEMS}
            name="Items"
            onClick={() => setTabName(DashBoardTabName.ITEMS)}
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
          <Search isVisible={activeTabName === DashBoardTabName.SEARCH} />
        </div>
      </div>
    </div>
  );
}

const NavbarItem: React.FC<{
  tabName: DashBoardTabName;
  activeTabName: DashBoardTabName;
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
