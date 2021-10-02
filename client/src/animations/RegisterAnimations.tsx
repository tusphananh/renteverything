import { motion, useAnimation, Variants } from "framer-motion";
import { FC, useEffect } from "react";
import { registerAnimationVariantsName } from "../constants/RegisterConstants";

const visibleTime = 0.6;
const hiddenTime = 0.3;
export const registerAnimationVariants: Variants = {
  [registerAnimationVariantsName.VISIBLE]: {
    display: "flex",
    opacity: 1,
    height: "fit-content",
    transition: {
      duration: visibleTime,
    },
  },
  [registerAnimationVariantsName.HIDDEN]: {
    opacity: 0,
    height: 0,
    transition: { duration: hiddenTime },
    transitionEnd: { display: "none" },
  },
  [registerAnimationVariantsName.INFORMATION_VISIBLE]: {
    display: "flex",
    opacity: 1,
    height: 200,
    transition: {
      duration: visibleTime,
    },
  },
  [registerAnimationVariantsName.INFORMATION_HIDDEN]: {
    opacity: 0,
    height: 0,
    transition: { duration: hiddenTime },
    transitionEnd: { display: "none" },
  },
  [registerAnimationVariantsName.INPUT_VISIBLE]: {
    display: "flex",
    opacity: 1,
    left: [-30, 0],
    height: 52,
    transition: { duration: visibleTime },
  },
  [registerAnimationVariantsName.INPUT_HIDDEN]: {
    opacity: 0,
    height: 0,
    transition: { duration: hiddenTime },
    transitionEnd: { display: "none" },
  },
  [registerAnimationVariantsName.NAV_BAR_VISIBLE]: {
    display: "flex",
    opacity: 1,
    height: "30px",
    marginLeft: [-30, 0],
    transition: { duration: visibleTime },
  },
  [registerAnimationVariantsName.NAV_BAR_HIDDEN]: {
    opacity: 0,
    height: 0,
    transition: { duration: hiddenTime },
    transitionEnd: { display: "none" },
  },
  [registerAnimationVariantsName.ERROR_VISIBLE]: {
    display: "flex",
    opacity: 1,
    marginTop: "20px",
    transition: { duration: 0.1 },
  },
  [registerAnimationVariantsName.ERROR_HIDDEN]: {
    opacity: 0,
    marginTop: 0,
    transition: { duration: hiddenTime },
    transitionEnd: { display: "none" },
  },
  [registerAnimationVariantsName.TEXT_VISIBLE]: {
    display: "flex",
    opacity: 1,
    margin: "6px",
    height: "fit-content",
    transition: { duration: visibleTime },
  },
  [registerAnimationVariantsName.TEXT_HIDDEN]: {
    opacity: 0,
    height: 0,
    margin: 0,
    transition: { duration: hiddenTime },
    transitionEnd: { display: "none" },
  },
  [registerAnimationVariantsName.SHAKE]: {
    transition: { duration: 0.2 },
    x: [10, -10, 5, -5, 0],
  },
};

export const RegisterTextAnimation: FC<{
  isVisible: boolean;
  className?: string;
  initial?: string;
}> = (props) => {
  const animationCtrl = useAnimation();

  useEffect(() => {
    if (props.isVisible) {
      animationCtrl.start(registerAnimationVariantsName.TEXT_VISIBLE);
    } else {
      animationCtrl.start(registerAnimationVariantsName.TEXT_HIDDEN);
    }
  }, [props.isVisible]);

  return (
    <motion.div
      initial={props.initial}
      className={props.className}
      variants={registerAnimationVariants}
      animate={animationCtrl}
    >
      {props.children}
    </motion.div>
  );
};

export const RegisterErrorAnimation: FC<{
  isVisible: boolean;
  className?: string;
  initial?: string;
}> = (props) => {
  const animationCtrl = useAnimation();

  if (props.isVisible) {
    animationCtrl.start(registerAnimationVariantsName.ERROR_VISIBLE);
    animationCtrl.start(registerAnimationVariantsName.SHAKE);
  } else {
    animationCtrl.start(registerAnimationVariantsName.ERROR_HIDDEN);
  }

  return (
    <motion.p
      initial={props.initial}
      className={props.className}
      variants={registerAnimationVariants}
      animate={animationCtrl}
    >
      {props.children}
    </motion.p>
  );
};

export const RegisterInputAnimation: FC<{
  isVisible: boolean;
  className?: string;
  type?: string;
  placeholder?: string;
  initial?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = (props) => {
  const animationCtrl = useAnimation();

  useEffect(() => {
    if (props.isVisible) {
      animationCtrl.start(registerAnimationVariantsName.INPUT_VISIBLE);
    } else {
      animationCtrl.start(registerAnimationVariantsName.INPUT_HIDDEN);
    }
  }, [props.isVisible]);

  return (
    <motion.input
      initial={props.initial}
      onChange={props.onChange}
      placeholder={props.placeholder}
      type={props.type}
      className={props.className}
      variants={registerAnimationVariants}
      animate={animationCtrl}
    >
      {props.children}
    </motion.input>
  );
};

export const RegisterNavBarAnimation: FC<{
  isVisible: boolean;
  className?: string;
  initial?: string;
}> = (props) => {
  const animationCtrl = useAnimation();

  useEffect(() => {
    if (props.isVisible) {
      animationCtrl.start(registerAnimationVariantsName.NAV_BAR_VISIBLE);
    } else {
      animationCtrl.start(registerAnimationVariantsName.NAV_BAR_HIDDEN);
    }
  }, [props.isVisible]);

  return (
    <motion.div
      initial={props.initial}
      className={props.className}
      variants={registerAnimationVariants}
      animate={animationCtrl}
    >
      {props.children}
    </motion.div>
  );
};

export const RegisterInformationAnimation: FC<{
  isVisible: boolean;
  className?: string;
  initial?: string;
}> = (props) => {
  const animationCtrl = useAnimation();

  useEffect(() => {
    if (props.isVisible) {
      animationCtrl.start(registerAnimationVariantsName.INFORMATION_VISIBLE);
    } else {
      animationCtrl.start(registerAnimationVariantsName.INFORMATION_HIDDEN);
    }
  }, [props.isVisible]);

  return (
    <motion.div
      initial={props.initial}
      className={props.className}
      variants={registerAnimationVariants}
      animate={animationCtrl}
    >
      {props.children}
    </motion.div>
  );
};
