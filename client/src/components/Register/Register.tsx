import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import styles from "../../styles/Register.module.scss";
import Logo from "../../assets/icons/logo-light.svg";
import Image from "next/image";
import ArrowToRight from "../../assets/icons/arrow-to-right.svg";
import {
  RegisterStates,
  registerAnimationVariantsName,
} from "../../constants/RegisterConstants";
import {
  isPasswordValid,
  isPhoneNumberValid,
} from "../../utils/inputValidator";
import { motion, useAnimation } from "framer-motion";
import { registerAnimationVariants } from "../../animations/RegisterAnimations";

interface error {
  bool: boolean;
  message: string;
}

const Login: FC = () => {
  const route = useRouter();
  const { authState } = useAuth();
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<error>({
    bool: false,
    message: "",
  });
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [registerState, setregisterStates] = React.useState<RegisterStates>(
    RegisterStates.PHONE_STATE
  );
  const errorAnimCtrls = useAnimation();
  const navPhoneStateAnimCtrls = useAnimation();
  const navPassStateAnimCtrls = useAnimation();
  const textPhoneStateAnimCtrls = useAnimation();
  const textPassStateAnimCtrls = useAnimation();
  const inputPhoneStateAnimCtrls = useAnimation();
  const inputPassStateAnimCtrls = useAnimation();

  const toPhoneState = () => {
    navPhoneStateAnimCtrls.start(registerAnimationVariantsName.NAV_BAR_VISIBLE);
    navPassStateAnimCtrls.start(registerAnimationVariantsName.NAV_BAR_HIDDEN);
    textPassStateAnimCtrls.start(registerAnimationVariantsName.TEXT_HIDDEN);
    textPhoneStateAnimCtrls.start(registerAnimationVariantsName.TEXT_VISIBLE);
    inputPassStateAnimCtrls.start(registerAnimationVariantsName.INPUT_HIDDEN);
    inputPhoneStateAnimCtrls.start(registerAnimationVariantsName.INPUT_VISIBLE);
  };

  const toPassState = () => {
    navPhoneStateAnimCtrls.start(registerAnimationVariantsName.NAV_BAR_HIDDEN);
    navPassStateAnimCtrls.start(registerAnimationVariantsName.NAV_BAR_VISIBLE);
    textPassStateAnimCtrls.start(registerAnimationVariantsName.TEXT_VISIBLE);
    textPhoneStateAnimCtrls.start(registerAnimationVariantsName.TEXT_HIDDEN);
    inputPassStateAnimCtrls.start(registerAnimationVariantsName.INPUT_VISIBLE);
    inputPhoneStateAnimCtrls.start(registerAnimationVariantsName.INPUT_HIDDEN);
  };

  const showError = () => {
    errorAnimCtrls.start(registerAnimationVariantsName.ERROR_VISIBLE);
  };

  const hideError = () => {
    errorAnimCtrls.start(registerAnimationVariantsName.ERROR_HIDDEN);
  };

  const shakeError = () => {
    errorAnimCtrls.start(registerAnimationVariantsName.SHAKE);
  };

  const back = () => {
    setregisterStates(RegisterStates.PHONE_STATE);
  };

  const register = async () => {
    if (isPasswordValid(password)) {
      setError({
        bool: false,
        message: "",
      });
    } else {
      setError({
        bool: true,
        message:
          "Password must be at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
      });
      showError();
      shakeError();
    }
  };
  const next = () => {
    if (isPhoneNumberValid(phoneNumber)) {
      setError({
        bool: false,
        message: "",
      });
      setregisterStates(RegisterStates.INFORMATION_STATE);
      hideError();
    } else {
      setError({
        bool: true,
        message: "Please enter a valid phone number",
      });
      showError();
      shakeError();
    }
  };

  useEffect(() => {
    if (registerState === RegisterStates.PHONE_STATE) {
      toPhoneState();
      if (error.bool) {
        hideError();
      }
    } else {
      toPassState();
      if (error.bool) {
        hideError();
      }
    }
  }, [registerState]);

  useEffect(() => {
    authState.isAuthenticated && route.push("/");
  }, [authState.isAuthenticated]);

  return (
    <>
      <div className={styles["body"]}>
        <div className={styles["body__blur"]}>
          <Image src={Logo} alt="" className={styles["logo"]} />
          <motion.div
            initial={registerAnimationVariantsName.VISIBLE}
            animate={textPhoneStateAnimCtrls}
            variants={registerAnimationVariants}
            className={styles["welcome__container"]}
          >
            Welcome !
            <p>
              Register to start <span>RentEverything</span>
            </p>
          </motion.div>
          <motion.div
            initial={registerAnimationVariantsName.HIDDEN}
            animate={textPassStateAnimCtrls}
            variants={registerAnimationVariants}
            className={styles["welcome__container"]}
          >
            <p>We need your password to start</p>
          </motion.div>
          <div className={styles["horizontal-line"]}></div>
          <div className={styles["input__container"]}>
            <motion.input
              initial={registerAnimationVariantsName.INPUT_VISIBLE}
              animate={inputPhoneStateAnimCtrls}
              variants={registerAnimationVariants}
              type="text"
              placeholder="Phone"
              className={styles["input"]}
              onChange={(event) => {
                setPhoneNumber(event.target.value);
              }}
            ></motion.input>
            <motion.input
              initial={registerAnimationVariantsName.INPUT_HIDDEN}
              animate={inputPassStateAnimCtrls}
              variants={registerAnimationVariants}
              type="text"
              placeholder="Password"
              className={styles["input"]}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            ></motion.input>
          </div>
          <motion.div
            initial={registerAnimationVariantsName.ERROR_HIDDEN}
            animate={errorAnimCtrls}
            variants={registerAnimationVariants}
            className={styles["error"]}
          >
            {error.message}
          </motion.div>
          <div className={styles["link"]}>
            <a href="/register">
              Don’t have an account ? <span>Register now</span>
            </a>
            <a href="/forgot-password">Forgot your password ?</a>
          </div>
          <div className={styles["bottom-nav-bar"]}>
            <motion.div
              initial={registerAnimationVariantsName.NAV_BAR_VISIBLE}
              animate={navPhoneStateAnimCtrls}
              variants={registerAnimationVariants}
              className={styles["bottom-nav-bar__container"]}
            >
              <button
                className={styles["confirm-btn"]}
                onClick={() => {
                  next();
                }}
              >
                <p>Next</p>
                <Image
                  src={ArrowToRight}
                  alt="logo"
                  layout="fixed"
                  width="20px"
                  height="20px"
                  color="white"
                />
              </button>
            </motion.div>
            <motion.div
              initial={registerAnimationVariantsName.NAV_BAR_HIDDEN}
              animate={navPassStateAnimCtrls}
              variants={registerAnimationVariants}
              className={styles["bottom-nav-bar__container"]}
            >
              <button
                className={styles["bottom-nav-bar__back-btn"]}
                onClick={() => {
                  back();
                }}
              >
                Go back
              </button>
              <div className={styles["verticle-line"]}> </div>
              <button
                className={styles["confirm-btn"]}
                onClick={() => {
                  register();
                }}
              >
                Start
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
