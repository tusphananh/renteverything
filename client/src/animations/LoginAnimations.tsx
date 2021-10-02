import { Variants } from "framer-motion";
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
