import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import React, { useEffect } from "react";
import { variants } from "../../../animations/VariantAnimations";
import StreetViewIcon from "../../../assets/icons/street-view.svg";
import {
  ActivitiesStatus,
  ActivityMaybe,
} from "../../../constants/ActivitiesConstants";
import { useActivitiesContext } from "../../../contexts/activitiesContext";
import {
  capitalizeFirstLetter,
  formatDate,
  getReverseActivityStatus,
  hourFormatter,
} from "../../../utils/formatter";
import common from "../../../styles/common.module.scss";
import styles from "./Activities.module.scss";
function Activities() {
  return <RecentBoard Icon={StreetViewIcon} />;
}

const RecentBoard: React.FC<{
  Icon: any;
}> = ({ Icon }) => {
  const { activitiesState } = useActivitiesContext();
  useEffect(() => {
    console.log(activitiesState);
  }, [activitiesState]);
  return (
    <motion.div className={styles["activities"]}>
      {/* Title Here */}
      <BoardHeader title={"Recent"} Icon={Icon} />
      {/* Render Items Here */}
      <AnimateSharedLayout>
        <AnimatePresence>
          <motion.div
            layout
            variants={variants}
            initial="initial"
            animate="visible"
            exit="exit"
            className={styles["activities-content"]}
          >
            <ActivitiesBoard
              type="rent"
              title="Rent"
              activities={activitiesState.rentActivities}
            />
            <ActivitiesBoard
              type="provide"
              title="Provide"
              activities={activitiesState.provideActivities}
            />
          </motion.div>
        </AnimatePresence>
      </AnimateSharedLayout>
    </motion.div>
  );
};

const ActivitiesBoard: React.FC<{
  type: string;
  title: string;
  activities?: ActivityMaybe[];
}> = ({ type, activities, title }) => {
  return (
    <motion.div layout className={styles["activities-container"]}>
      <div className={styles["activitiesTitle"]}>{title}</div>
      {activities?.map((activity: ActivityMaybe) => {
        return (
          <BoardItem
            type={type}
            key={activity?.id}
            id={activity?.id}
            name={activity?.itemName || "No Name"}
            duration={activity?.duration || 0}
            description={activity?.itemDescription || "No Description"}
            createAt={formatDate(activity?.createdAt)}
            status={getReverseActivityStatus(activity?.status)}
            totalPrice={activity?.totalPrice || 0}
            itemRealValue={activity?.itemRealValue || 0}
            distance={activity?.distance || 0}
            provider={
              `${activity?.provider.firstName} ${activity?.provider.lastName}` ||
              "No Name"
            }
            providerPhone={activity?.provider.phone || "No Phone"}
            renter={
              `${activity?.renter.firstName} ${activity?.renter.lastName}` ||
              "No Name"
            }
            renterPhone={activity?.renter.phone || "No Phone"}
            itemPrice={activity?.itemPrice || 0}
          />
        );
      })}
    </motion.div>
  );
};
const BoardHeader: React.FC<{
  title: string;
  Icon: any;
}> = ({ title, Icon }) => {
  return (
    <motion.div className={styles["activities__header"]}>
      <motion.div className={styles["activities-header__title"]}>
        <Icon className={styles["activities-header-title__icon"]} />
        <p className={styles["activities-header-title__text"]}>{title}</p>
      </motion.div>
      <motion.div className={styles["activities-header__more"]}>
        <p className={styles["activities-header-more__text"]}>show more</p>
      </motion.div>
    </motion.div>
  );
};

const BoardItem: React.FC<{
  type: string;
  id: string;
  name: string;
  description: string;
  createAt: string;
  duration: number;
  status: ActivitiesStatus;
  totalPrice: number;
  itemRealValue: number;
  distance: number;
  provider: string;
  providerPhone: string;
  renter: string;
  renterPhone: string;
  itemPrice: number;
}> = ({
  id,
  type,
  name,
  description,
  duration,
  status,
  itemRealValue,
  itemPrice,
  totalPrice,
}) => {
  const [statusStyle, setStatusStyle] = React.useState(
    styles["activities__right"]
  );
  const [isExtended, setIsExtended] = React.useState(false);
  const { cancel, inProgress, success } = useActivitiesContext();
  React.useEffect(() => {
    if (status === ActivitiesStatus.SUCCESS) {
      setStatusStyle(styles["success"]);
    } else if (status === ActivitiesStatus.IN_PROGRESS) {
      console.log("in progress");

      setStatusStyle(styles["in-progress"]);
    } else if (status === ActivitiesStatus.FAILED) {
      setStatusStyle(styles["failure"]);
    } else if (status === ActivitiesStatus.PENDING) {
      setStatusStyle(styles["pending"]);
    }
  }, [status]);

  return (
    <motion.div layout className={styles["activities-item"]}>
      <motion.div
        layout
        className={styles["activities-item-nested"]}
        onClick={() => setIsExtended(!isExtended)}
      >
        <motion.div className={styles["activities-title-container"]}>
          <motion.p
            className={styles["activities-title--left"] + " " + statusStyle}
          >
            Name
          </motion.p>
          <motion.p
            className={styles["activities-title--right"] + " " + statusStyle}
          >
            {capitalizeFirstLetter(name)}
          </motion.p>
        </motion.div>
      </motion.div>

      {isExtended && (
        <AnimatePresence>
          <motion.div
            layout
            variants={variants}
            initial="initial"
            animate="visible"
            exit="exit"
            className={styles["activities-extended-nested"]}
            onClick={() => setIsExtended(!isExtended)}
          >
            {/* Desciption */}
            <motion.div className={styles["activities-title-container"]}>
              <motion.p className={styles["activities-title--left"]}>
                Description
              </motion.p>
              <motion.p className={styles["activities-title--right"]}>
                {description}
              </motion.p>
            </motion.div>
            {/* Total Price */}
            <motion.div className={styles["activities-title-container"]}>
              <motion.p className={styles["activities-title--left"]}>
                Total Price
              </motion.p>
              <motion.p className={styles["activities-title--right"]}>
                {totalPrice} $
              </motion.p>
            </motion.div>
            {/* Duration */}
            <motion.div className={styles["activities-title-container"]}>
              <motion.p className={styles["activities-title--left"]}>
                Duration
              </motion.p>
              <motion.p className={styles["activities-title--right"]}>
                {hourFormatter(duration)}
              </motion.p>
            </motion.div>
            {/*  Item Price */}
            <motion.div className={styles["activities-title-container"]}>
              <motion.p className={styles["activities-title--left"]}>
                Item Price
              </motion.p>
              <motion.p className={styles["activities-title--right"]}>
                {itemPrice} $/hour
              </motion.p>
            </motion.div>
            {/*  Item Real Value */}
            <motion.div className={styles["activities-title-container"]}>
              <motion.p className={styles["activities-title--left"]}>
                Item Real Value
              </motion.p>
              <motion.p className={styles["activities-title--right"]}>
                {itemRealValue} $
              </motion.p>
            </motion.div>
            {/*  Status */}
            <motion.div className={styles["activities-title-container"]}>
              <motion.p className={styles["activities-title--left"]}>
                Status
              </motion.p>
              <motion.p className={styles["activities-title--right"]}>
                {status}
              </motion.p>
            </motion.div>
          </motion.div>
          <motion.div
            layout
            variants={variants}
            initial="initial"
            animate="visible"
            exit="exit"
            className={styles["activities__extended"]}
          >
            <motion.div
              layout
              variants={variants}
              initial="initial"
              animate="visible"
              exit="exit"
              className={styles["activities-extended__btn-container"]}
            >
              {status === ActivitiesStatus.PENDING && (
                <motion.button
                  layout
                  className={styles["activities-extended__btn-decline"]}
                  onClick={() => {
                    cancel(id);
                  }}
                >
                  Cancel
                </motion.button>
              )}
              {type === "provide" &&
                status !== ActivitiesStatus.SUCCESS &&
                status !== ActivitiesStatus.FAILED && (
                  <motion.button
                    layout
                    className={
                      styles["activities-extended__btn"] +
                      " " +
                      common.primaryColor
                    }
                    onClick={() => {
                      status === ActivitiesStatus.PENDING && inProgress(id);
                      status === ActivitiesStatus.IN_PROGRESS && success(id);
                    }}
                  >
                    {status === ActivitiesStatus.PENDING
                      ? "In Progress"
                      : "Success"}
                  </motion.button>
                )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default Activities;
