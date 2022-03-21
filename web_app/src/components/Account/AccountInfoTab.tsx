import Image from 'next/image'
import { FC } from 'react'
import { useAuthContext } from '../../contexts/authContext'
import styles from './AccountInfoTab.module.scss'
const AccountInfoTab: FC = () => {
  const { authState } = useAuthContext()
  return (
    <div className={styles.accountInfoTab}>
      <div className={styles.avatarAndInfo}>
        <div className={styles.avatar}>
          <Image
            className={styles.avatar}
            src={`https://avatars.dicebear.com/api/avataaars/${
              authState.user!.firstName + authState.user!.firstName
            }.svg`}
            width="42px"
            height="42px"
            alt="avatar"
          />
        </div>
        <div className={styles.topInfoContainer}>
          <div className={styles.infoContainer}>
            <p className={styles.infoHeader}> FirstName </p>
            <p className={styles.infoValue}> {authState.user?.firstName} </p>
          </div>
          <div className={styles.infoContainer}>
            <p className={styles.infoHeader}> Phone </p>
            <p className={styles.infoValue}> {authState.user?.phone} </p>
          </div>
          <div className={styles.infoContainer}>
            <p className={styles.infoHeader}> LastName </p>
            <p className={styles.infoValue}> {authState.user?.lastName} </p>
          </div>
          <div className={styles.infoContainer}>
            <p className={styles.infoHeader}> Balance </p>
            <p className={styles.infoValue}> {authState.user?.balance} </p>
          </div>
        </div>
      </div>

      <div className={styles.infoContainer}>
        <p className={styles.infoHeader}> Created At </p>
        <p className={styles.infoValue}> {authState.user?.createdAt} </p>
      </div>
      <div className={styles.infoContainer}>
        <p className={styles.infoHeader}> Updated At </p>
        <p className={styles.infoValue}> {authState.user?.updatedAt} </p>
      </div>
    </div>
  )
}

export default AccountInfoTab
