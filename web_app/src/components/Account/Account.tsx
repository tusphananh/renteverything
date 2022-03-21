import {
  faIdCard,
  faMoneyBill,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment, useEffect } from 'react'
import { AccountTabName } from '../../constants/AccountConstants'
import { useAuthContext } from '../../contexts/authContext'
import styles from './Account.module.scss'
import AccountInfoTab from './AccountInfoTab'
import TopUpTab from './TopUpTab'
import VerifyAccountTab from './VerifyAccountTab'
function Account() {
  const [activeAccountTabName, setAccountTabName] = React.useState<
    AccountTabName
  >(AccountTabName.ACCOUNT_INFO)
  const [mainBoard, setMainBoard] = React.useState<JSX.Element>()
  const { authState } = useAuthContext()
  const [boards] = React.useState({
    info: <AccountInfoTab key={AccountTabName.ACCOUNT_INFO} />,
    verify: <VerifyAccountTab key={AccountTabName.VERIFY_ACCOUNT} />,
    topUp: <TopUpTab key={AccountTabName.TOP_UP} />,
  })

  useEffect(() => {
    if (activeAccountTabName === AccountTabName.ACCOUNT_INFO) {
      setMainBoard(boards.info)
    } else if (activeAccountTabName === AccountTabName.VERIFY_ACCOUNT) {
      setMainBoard(boards.verify)
    } else if (activeAccountTabName === AccountTabName.TOP_UP) {
      setMainBoard(boards.topUp)
    } else {
      setMainBoard(<Fragment />)
    }
  }, [activeAccountTabName])

  return (
    <Fragment>
      {authState.isAuthenticated ? (
        <div className={styles.container}>
          <p className={styles.headerName}>{activeAccountTabName}</p>

          <div className={styles.main}>
            <div className={styles.navBar}>
              <NavbarItem
                activeAccountTabName={activeAccountTabName}
                AccountTabName={AccountTabName.ACCOUNT_INFO}
                name="Infomaion"
                onClick={() => setAccountTabName(AccountTabName.ACCOUNT_INFO)}
              >
                <FontAwesomeIcon icon={faUser} />
              </NavbarItem>
              <NavbarItem
                activeAccountTabName={activeAccountTabName}
                AccountTabName={AccountTabName.VERIFY_ACCOUNT}
                name="Verify"
                onClick={() => setAccountTabName(AccountTabName.VERIFY_ACCOUNT)}
              >
                <FontAwesomeIcon icon={faIdCard} />
              </NavbarItem>
              <NavbarItem
                activeAccountTabName={activeAccountTabName}
                AccountTabName={AccountTabName.TOP_UP}
                name="Top Up"
                onClick={() => setAccountTabName(AccountTabName.TOP_UP)}
              >
                <FontAwesomeIcon icon={faMoneyBill} />
              </NavbarItem>
            </div>
            <div className={styles.dashboard}>{mainBoard}</div>
          </div>
        </div>
      ) : (
        <div> User not found </div>
      )}
    </Fragment>
  )
}

const NavbarItem: React.FC<{
  AccountTabName: AccountTabName
  activeAccountTabName: AccountTabName
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  name: string
}> = ({ activeAccountTabName, AccountTabName, children, onClick, name }) => {
  return (
    <button
      onClick={onClick}
      className={
        activeAccountTabName === AccountTabName
          ? styles.navbarItemActive
          : styles.navbarItemInactive
      }
    >
      <div className={styles.navBarLogo}>{children}</div>
      <p className={styles.navBarName}>{name}</p>
    </button>
  )
}

export default Account
