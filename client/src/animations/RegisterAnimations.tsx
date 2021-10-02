import { Variants } from "framer-motion";
import { registerAnimationVariantsName } from "../constants/RegisterConstants";

export const registerAnimationVariants: Variants = {
  [registerAnimationVariantsName.VISIBLE]: {
    display: "flex",
    opacity: 1,
    height: "10px",
    marginTop: "20px",
    transition: { duration: 0.3 },
  },
  [registerAnimationVariantsName.HIDDEN]: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: { duration: 0.3 },
    transitionEnd: { display: "none" },
  },
  [registerAnimationVariantsName.INPUT_VISIBLE]: {
    display: "flex",
    opacity: 1,
    marginLeft: [-30, 0],
    transition: { duration: 0.5 },
  },
  [registerAnimationVariantsName.INPUT_HIDDEN]: {
    opacity: 0,
    transition: { duration: 0.1 },
    transitionEnd: { display: "none" },
  },
  [registerAnimationVariantsName.NAV_BAR_VISIBLE]: {
    display: "flex",
    opacity: 1,
    height: "30px",
    marginLeft: [-30, 0],
    transition: { duration: 0.3 },
  },
  [registerAnimationVariantsName.NAV_BAR_HIDDEN]: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.1 },
    transitionEnd: { display: "none" },
  },
  [registerAnimationVariantsName.ERROR_VISIBLE]: {
    display: "flex",
    opacity: 1,
    height: "10px",
    marginTop: "20px",
    transition: { duration: 0.3 },
  },
  [registerAnimationVariantsName.ERROR_HIDDEN]: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: { duration: 0.3 },
    transitionEnd: { display: "none" },
  },
  [registerAnimationVariantsName.TEXT_VISIBLE]: {
    display: "flex",
    opacity: 1,
    margin: "6px",
    height: "fit-content",
    transition: { duration: 1 },
  },
  [registerAnimationVariantsName.TEXT_HIDDEN]: {
    opacity: 0,
    height: 0,
    margin: 0,
    transition: { duration: 0.5 },
    transitionEnd: { display: "none" },
  },
  [registerAnimationVariantsName.SHAKE]: {
    transition: { duration: 0.2 },
    x: [10, -10, 5, -5, 0],
  },
};
