import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import React, { Fragment } from 'react'
import { removeNearByItem } from '../../actions/searchActions'
import { variants } from '../../animations/VariantAnimations'
import CircleXIcon from '../../assets/icons/circle-x.svg'
import RecentLogo from '../../assets/icons/recent.svg'
import { ConfirmBoardState } from '../../constants/DashBoardConstants'
import {
  ConfirmInputValues,
  NearByItem,
  SearchResult,
} from '../../constants/SearchConstants'
import { useAuthContext } from '../../contexts/authContext'
import { useSearchContext } from '../../contexts/searchContext'
import { Item } from '../../graphql-generated/graphql'
import styles from '../../styles/NearBy.module.scss'
import { v4 as uuidv4 } from 'uuid'
import {
  capitalizeFirstLetter,
  hourFormatter,
  timeFormatter,
} from '../../utils/formatter'

const NearBy: React.FC<{}> = () => {
  return (
    <AnimateSharedLayout>
      <AnimatePresence>
        <motion.div layout className={styles['main']}>
          <NearByBoard Icon={RecentLogo} />
        </motion.div>
      </AnimatePresence>
    </AnimateSharedLayout>
  )
}

const NearByBoard: React.FC<{
  Icon: any
}> = ({ Icon }) => {
  const { searchState } = useSearchContext()
  const [confirmBoardState, setConfirmBoardState] = React.useState<
    ConfirmBoardState | undefined
  >(undefined)
  return (
    <motion.div layout className={styles['board']}>
      {/* Title Here */}
      <BoardHeader title={'Nearby'} Icon={Icon} />
      {/* Render Items Here */}
      <AnimatePresence>
        {confirmBoardState && (
          <ConfirmBoard
            name={confirmBoardState.name}
            distance={confirmBoardState.distance}
            route_duration={confirmBoardState.route_duration}
            duration={confirmBoardState.duration}
            id={confirmBoardState.id}
            setConfirmBoardState={setConfirmBoardState}
            address={searchState.address!}
          />
        )}
      </AnimatePresence>
      <motion.div
        layout
        variants={variants}
        initial="initial"
        animate="visible"
        exit="exit"
        className={styles['board__item-container']}
      >
        <AnimatePresence>
          {confirmBoardState && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3 } }}
              exit={{ opacity: 0 }}
              className={styles['blur-board']}
            />
          )}
        </AnimatePresence>
        {searchState.nearByItems?.map((item: NearByItem) => {
          return (
            <BoardItem
              key={item.id}
              name={item.name}
              id={item.id}
              duration={item.duration}
              route_duration={item.route_duration}
              distance={parseFloat((item.distance / 1000).toFixed(2))}
              setConfirmBoardState={setConfirmBoardState}
            />
          )
        })}
      </motion.div>
    </motion.div>
  )
}

const ConfirmBoard: React.FC<{
  name: string
  distance: number
  duration: number
  route_duration: number
  id: string
  setConfirmBoardState: React.Dispatch<
    React.SetStateAction<ConfirmBoardState | undefined>
  >
  address: string
}> = ({
  name,
  distance,
  duration,
  route_duration,
  id,
  setConfirmBoardState,
  address,
}) => {
  const { authState } = useAuthContext()
  const { sendResult, searchState, searchDispatch } = useSearchContext()
  const [inputValue, setInputValue] = React.useState<ConfirmInputValues>()
  const confirm = () => {
    if (
      inputValue?.description &&
      inputValue?.name &&
      inputValue?.price &&
      inputValue?.realValue
    ) {
      const item: Item = {
        id: uuidv4(),
        name: inputValue?.name!,
        price: inputValue?.price!,
        description: inputValue?.description!,
        realValue: inputValue?.realValue!,
      }

      const result: SearchResult = {
        id: uuidv4(),
        searchId: id,
        name: name,
        distance: distance,
        duration: duration,
        itemName: item.name,
        itemPrice: item.price,
        itemRealValue: item.realValue,
        itemDescription: item.description,
        totalPrice: duration * inputValue?.price!,
        provider: authState.user!,
        providerPosition: searchState.curPos!,
      }

      sendResult(result)
      searchDispatch(removeNearByItem(id))
      setConfirmBoardState(undefined)
    }
  }

  return (
    <motion.div
      layout
      variants={variants}
      initial="zoomInital"
      animate="zoomVisible"
      exit="zoomExit"
      className={styles['confirm-container']}
    >
      <div className={styles['confirm-board']}>
        <div className={styles['confirm-board__navbar']}>
          <button
            className={styles['confirm-board__navbar-btn']}
            onClick={() => {
              setConfirmBoardState(undefined)
            }}
          >
            <CircleXIcon />
          </button>
        </div>
        <div className={styles['confirm-board__header-container']}>
          <p className={styles['confirm-board__header-left']}> {name}</p>
          <p className={styles['confirm-board__header-right']}>
            {`${distance} km`}
          </p>
          <p
            className={
              styles['confirm-board__header-left'] + ' ' + styles['font-size-1']
            }
          >
            {hourFormatter(duration)}
          </p>
          <p className={styles['confirm-board__header-right']}>
            {timeFormatter(route_duration)}
          </p>
        </div>
        <div className={styles['confirm-board__information-container']}>
          <div className={styles['confirm-board__input-container']}>
            <p>Name</p>
            <input
              type="text"
              placeholder="Max 5 words"
              onChange={(e) => {
                setInputValue({ ...inputValue, name: e.target.value })
              }}
            />
          </div>
          <div className={styles['confirm-board__input-container']}>
            <p>Pricing</p>
            <input
              type="text"
              placeholder="USD / hour"
              onChange={(e) => {
                setInputValue({
                  ...inputValue,
                  price: parseFloat(e.target.value),
                })
              }}
            />
          </div>
          <div className={styles['confirm-board__input-container']}>
            <p>Real value</p>
            <input
              type="text"
              placeholder="USD"
              onChange={(e) => {
                setInputValue({
                  ...inputValue,
                  realValue: parseFloat(e.target.value),
                })
              }}
            />
          </div>
          <div className={styles['confirm-board__input-container']}>
            <p>Description</p>
            <input
              type="text"
              placeholder="Max 10 words"
              onChange={(e) => {
                setInputValue({
                  ...inputValue,
                  description: e.target.value,
                })
              }}
            />
          </div>
          <div className={styles['confirm-board__input-container--location']}>
            <p>Address</p>
            <button className={styles['confirm-board__address']}>
              {address}
            </button>
          </div>
        </div>
        <button
          className={styles['confirm-board__btn']}
          onClick={() => {
            confirm()
          }}
        >
          <p>Confirm</p>
        </button>
      </div>
    </motion.div>
  )
}
const BoardItem: React.FC<{
  name: string
  distance: number
  id: string
  duration: number
  route_duration: number
  setConfirmBoardState: React.Dispatch<
    React.SetStateAction<ConfirmBoardState | undefined>
  >
}> = ({
  name,
  distance,
  id,
  duration,
  route_duration,
  setConfirmBoardState,
}) => {
  const [isExtended, setIsExtended] = React.useState(false)
  const { searchDispatch } = useSearchContext()
  const approve = () => {
    setConfirmBoardState({
      name,
      distance,
      duration,
      route_duration,
      id,
      visible: true,
    })
  }

  return (
    <motion.div
      layout
      variants={variants}
      initial="initial"
      animate="visible"
      exit="exit"
      className={styles['board-item']}
    >
      <motion.div
        layout
        className={styles['board-item-nested']}
        onClick={() => setIsExtended(!isExtended)}
      >
        <div className={styles['board-title-container']}>
          <p className={styles['board-title--left']}>
            {capitalizeFirstLetter(name)}
          </p>
          <p className={styles['board-title--right']}>{distance + ' km'}</p>
        </div>
      </motion.div>

      {isExtended && (
        <Fragment>
          <motion.div
            layout
            variants={variants}
            initial="initial"
            animate="visible"
            exit="exit"
            className={styles['board-extended-nested']}
            onClick={() => setIsExtended(!isExtended)}
          >
            <div className={styles['board-title-container']}>
              <p className={styles['board-title--left']}>
                {hourFormatter(duration)}
              </p>
              <p className={styles['board-title--right']}>
                {timeFormatter(route_duration)}
              </p>
            </div>
          </motion.div>
          <motion.div
            className={styles['board__extended']}
            layout
            variants={variants}
            initial="initial"
            animate="visible"
            exit="exit"
          >
            <div className={styles['board-extended__btn-container']}>
              <button
                className={styles['board-extended__btn-approve']}
                onClick={() => {
                  approve()
                }}
              >
                Approve
              </button>
              <button
                className={styles['board-extended__btn-decline']}
                onClick={() => {
                  searchDispatch(removeNearByItem(id))
                }}
              >
                Decline
              </button>
            </div>
          </motion.div>
        </Fragment>
      )}
    </motion.div>
  )
}

const BoardHeader: React.FC<{
  title: string
  Icon: any
}> = ({ title, Icon }) => {
  return (
    <motion.div layout className={styles['board__header']}>
      <motion.div layout className={styles['board-header__title']}>
        <Icon className={styles['board-header-title__icon']} />
        <p className={styles['board-header-title__text']}>{title}</p>
      </motion.div>
      <motion.div layout className={styles['board-header__more']}>
        <p className={styles['board-header-more__text']}>show more</p>
      </motion.div>
    </motion.div>
  )
}

export default NearBy
