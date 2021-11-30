import { motion, useAnimation, Variants } from "framer-motion";
import { FC, useEffect } from "react";
import { searchAnimationVariantsName } from "../constants/SearchConstants";

const visibleTime = 0.6;
const hiddenTime = 0.3;
export const searchAnimationVariants: Variants = {
  [searchAnimationVariantsName.HIDDEN]: {
    opacity: 0,
    transition: { duration: hiddenTime },
    transitionEnd: { display: "none" },
  },
  [searchAnimationVariantsName.VISIBLE]: {
    display: "",
    opacity: 1,
    transition: {
      duration: visibleTime,
    },
  },
};

export const SkeletonAnimation: FC<{
  isVisible: boolean;
  className?: string;
  initial?: string;
}> = (props) => {
  const animationCtrl = useAnimation();

  useEffect(() => {
    if (props.isVisible) {
      animationCtrl.start(searchAnimationVariants.VISIBLE);
    } else {
      animationCtrl.start(searchAnimationVariants.HIDDEN);
    }
  }, [props.isVisible]);

  return (
    <motion.div
      initial={props.initial}
      className={props.className}
      variants={searchAnimationVariants}
      animate={animationCtrl}
    >
      {props.children}
    </motion.div>
  );
};

export const SearchPanelAnimation: FC<{
  isVisible: boolean;
  className?: string;
  initial?: string;
}> = (props) => {
  const animationCtrl = useAnimation();

  useEffect(() => {
    if (props.isVisible) {
      animationCtrl.start(searchAnimationVariants.VISIBLE);
    } else {
      animationCtrl.start(searchAnimationVariants.HIDDEN);
    }
  }, [props.isVisible]);

  return (
    <motion.div
      initial={props.initial}
      className={props.className}
      variants={searchAnimationVariants}
      animate={animationCtrl}
    >
      {props.children}
    </motion.div>
  );
};

export const ResultsPanelAnimation: FC<{
  isVisible: boolean;
  className?: string;
  initial?: string;
}> = (props) => {
  const animationCtrl = useAnimation();

  useEffect(() => {
    if (props.isVisible) {
      animationCtrl.start(searchAnimationVariants.VISIBLE);
    } else {
      animationCtrl.start(searchAnimationVariants.HIDDEN);
    }
  }, [props.isVisible]);

  return (
    <motion.div
      initial={props.initial}
      className={props.className}
      variants={searchAnimationVariants}
      animate={animationCtrl}
    >
      {props.children}
    </motion.div>
  );
};
