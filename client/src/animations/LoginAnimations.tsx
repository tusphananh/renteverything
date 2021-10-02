import { motion, useAnimation, Variants } from "framer-motion";
import { FC, useEffect } from "react";
import { loginAnimationVariantsName } from "../constants/LoginConstants";

export const loginAnimationVariants: Variants = {
  [loginAnimationVariantsName.VISIBLE]: {
    display: "flex",
    opacity: 1,
    height: "10px",
    marginTop: "20px",
    transition: { duration: 0.3 },
  },
  [loginAnimationVariantsName.HIDDEN]: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: { duration: 0.3 },
    transitionEnd: { display: "none" },
  },
  [loginAnimationVariantsName.INPUT_VISIBLE]: {
    display: "flex",
    opacity: 1,
    marginLeft: [-30, 0],
    transition: { duration: 0.5 },
  },
  [loginAnimationVariantsName.INPUT_HIDDEN]: {
    opacity: 0,
    transition: { duration: 0.1 },
    transitionEnd: { display: "none" },
  },
  [loginAnimationVariantsName.NAV_BAR_VISIBLE]: {
    display: "flex",
    opacity: 1,
    height: "30px",
    marginLeft: [-30, 0],
    transition: { duration: 0.3 },
  },
  [loginAnimationVariantsName.NAV_BAR_HIDDEN]: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.1 },
    transitionEnd: { display: "none" },
  },
  [loginAnimationVariantsName.ERROR_VISIBLE]: {
    display: "flex",
    opacity: 1,
    height: "10px",
    marginTop: "20px",
    transition: { duration: 0.3 },
  },
  [loginAnimationVariantsName.ERROR_HIDDEN]: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: { duration: 0.3 },
    transitionEnd: { display: "none" },
  },
  [loginAnimationVariantsName.TEXT_VISIBLE]: {
    display: "flex",
    opacity: 1,
    margin: "6px",
    height: "fit-content",
    transition: { duration: 1 },
  },
  [loginAnimationVariantsName.TEXT_HIDDEN]: {
    opacity: 0,
    height: 0,
    margin: 0,
    transition: { duration: 0.5 },
    transitionEnd: { display: "none" },
  },
  [loginAnimationVariantsName.SHAKE]: {
    transition: { duration: 0.2 },
    x: [10, -10, 5, -5, 0],
  },
};

export const LoginTextAnimation: FC<{
  isVisible: boolean;
  className?: string;
  initial?: string;
}> = (props) => {
  const animationCtrl = useAnimation();

  useEffect(() => {
    if (props.isVisible) {
      animationCtrl.start(loginAnimationVariantsName.TEXT_VISIBLE);
    } else {
      animationCtrl.start(loginAnimationVariantsName.TEXT_HIDDEN);
    }
  }, [props.isVisible]);

  return (
    <motion.div
      initial={props.initial}
      className={props.className}
      variants={loginAnimationVariants}
      animate={animationCtrl}
    >
      {props.children}
    </motion.div>
  );
};

export const LoginErrorAnimation: FC<{
  isVisible: boolean;
  className?: string;
  initial?: string;
}> = (props) => {
  const animationCtrl = useAnimation();

  if (props.isVisible) {
    animationCtrl.start(loginAnimationVariantsName.ERROR_VISIBLE);
    animationCtrl.start(loginAnimationVariantsName.SHAKE);
  } else {
    animationCtrl.start(loginAnimationVariantsName.ERROR_HIDDEN);
  }

  return (
    <motion.p
      initial={props.initial}
      className={props.className}
      variants={loginAnimationVariants}
      animate={animationCtrl}
    >
      {props.children}
    </motion.p>
  );
};

export const LoginInputAnimation: FC<{
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
      animationCtrl.start(loginAnimationVariantsName.INPUT_VISIBLE);
    } else {
      animationCtrl.start(loginAnimationVariantsName.INPUT_HIDDEN);
    }
  }, [props.isVisible]);

  return (
    <motion.input
      initial={props.initial}
      onChange={props.onChange}
      placeholder={props.placeholder}
      type={props.type}
      className={props.className}
      variants={loginAnimationVariants}
      animate={animationCtrl}
    >
      {props.children}
    </motion.input>
  );
};

export const LoginNavBarAnimation: FC<{
  isVisible: boolean;
  className?: string;
  initial?: string;
}> = (props) => {
  const animationCtrl = useAnimation();

  useEffect(() => {
    if (props.isVisible) {
      animationCtrl.start(loginAnimationVariantsName.NAV_BAR_VISIBLE);
    } else {
      animationCtrl.start(loginAnimationVariantsName.NAV_BAR_HIDDEN);
    }
  }, [props.isVisible]);

  return (
    <motion.div
      initial={props.initial}
      className={props.className}
      variants={loginAnimationVariants}
      animate={animationCtrl}
    >
      {props.children}
    </motion.div>
  );
};
