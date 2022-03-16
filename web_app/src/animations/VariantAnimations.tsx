import { Variants } from "framer-motion";

/**
 * Framer motion animation variants
 */
export const variants: Variants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
  zoomVisible: {
    scale: 1,
    // opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  zoomExit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  zoomInital: {
    scale: 0,
    // opacity: 0,
  },
};
