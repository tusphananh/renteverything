import Image from 'next/image'
import React, { useEffect } from 'react'
import CalenderIcon from '../../assets/icons/calender.svg'
import HomeIcon from '../../assets/icons/home.svg'
import ItemsIcon from '../../assets/icons/items.svg'
import LogoutIcon from '../../assets/icons/logout.svg'
import MessageIcon from '../../assets/icons/messages.svg'
import NotiIcon from '../../assets/icons/noti.svg'
import SearchIcon from '../../assets/icons/signal-stream.svg'
import { TabName } from '../../constants/DashBoardConstants'
import { useAuthContext } from '../../contexts/authContext'
import { User } from '../../graphql-generated/graphql'
import styles from '../../styles/DashBoard.module.scss'
import Activities from './ Activities'
import Items from './ Items'
import Message from './Message'
import NearBy from './NearBy'
import Search from './Search'

function Dashboard() {
  const [activeTabName, setTabName] = React.useState<TabName>(TabName.NEAR_BY)
  const [mainBoard, setMainBoard] = React.useState<JSX.Element>()
  const { authState } = useAuthContext()
  const [user, setUser] = React.useState<User>()
  const [boards] = React.useState({
    home: <NearBy key={TabName.NEAR_BY} />,
    message: <Message key={TabName.MESSAGES} />,
    activities: <Activities key={TabName.ACTIVITIES} />,
    items: <Items key={TabName.ITEMS} />,
  })

  useEffect(() => {
    authState.user && setUser(authState.user)
  }, [authState.user])

  useEffect(() => {
    if (activeTabName === TabName.NEAR_BY) {
      setMainBoard(boards.home)
    } else if (activeTabName === TabName.MESSAGES) {
      setMainBoard(boards.message)
    } else if (activeTabName === TabName.ACTIVITIES) {
      setMainBoard(boards.activities)
    } else if (activeTabName === TabName.ITEMS) {
      setMainBoard(boards.items)
    } else {
      setMainBoard(<></>)
    }
  }, [activeTabName])

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <div className={styles['header__avatar']}>
          <Image
            src={`https://avatars.dicebear.com/api/avataaars/${
              user && user.firstName + user.lastName
            }.svg`}
            width="42px"
            height="42px"
            alt="avatar"
          />
        </div>

        <div className={styles['header__user-info-container']}>
          <p> {user && user.firstName + ' ' + user.lastName}</p>
          <p>{user && user.balance + ' USD'}</p>
        </div>

        <p className={styles['header__name']}>{activeTabName}</p>
        <div className={styles['header__noti']}>
          <NotiIcon width="42px" height="42px" alt="notification" />
        </div>
      </div>
      <div className={styles['main']}>
        <div className={styles['navbar']}>
          <NavbarItem
            activeTabName={activeTabName}
            tabName={TabName.NEAR_BY}
            name="Near By"
            onClick={() => setTabName(TabName.NEAR_BY)}
          >
            <HomeIcon alt="Near By" />
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

          <button className={styles['navbar__item-logout']}>
            <div className={styles['navbar-item-logo']}>
              <LogoutIcon alt="Logout" />
            </div>
            <p className={styles['navbar-item-name']}>Log out</p>
          </button>
        </div>
        <div className={styles['dashboard']}>
          {mainBoard}
          <Search isVisible={activeTabName === TabName.SEARCH} />
        </div>
      </div>
    </div>
  )
}

const NavbarItem: React.FC<{
  tabName: TabName
  activeTabName: TabName
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  name: string
}> = ({ activeTabName, tabName, children, onClick, name }) => {
  return (
    <button
      onClick={onClick}
      className={
        activeTabName === tabName
          ? styles['navbar__item--active']
          : styles['navbar__item--inactive']
      }
    >
      <div className={styles['navbar-item-logo']}>{children}</div>
      <p className={styles['navbar-item-name']}>{name}</p>
    </button>
  )
}

export default Dashboard
