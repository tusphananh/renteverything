import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import styles from "../../styles/Login.module.scss";
import Logo from "../../assets/icons/logo-light.svg";
import Image from "next/image";
import ArrowToRight from "../../assets/icons/arrow-to-right.svg";
import {
  LoginStates,
  loginAnimationVariantsName,
} from "../../constants/LoginConstants";
import {
  isPasswordValid,
  isPhoneNumberValid,
} from "../../utils/inputValidator";
import { motion, useAnimation } from "framer-motion";
import { loginAnimationVariants } from "../../animations/LoginAnimations";

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
  const [loginState, setLoginStates] = React.useState<LoginStates>(
    LoginStates.PHONE_STATE
  );
  const errorAnimCtrls = useAnimation();
  const navPhoneStateAnimCtrls = useAnimation();
  const navPassStateAnimCtrls = useAnimation();
  const textPhoneStateAnimCtrls = useAnimation();
  const textPassStateAnimCtrls = useAnimation();
  const inputPhoneStateAnimCtrls = useAnimation();
  const inputPassStateAnimCtrls = useAnimation();

  const toPhoneState = () => {
    navPhoneStateAnimCtrls.start(loginAnimationVariantsName.NAV_BAR_VISIBLE);
    navPassStateAnimCtrls.start(loginAnimationVariantsName.NAV_BAR_HIDDEN);
    textPassStateAnimCtrls.start(loginAnimationVariantsName.TEXT_HIDDEN);
    textPhoneStateAnimCtrls.start(loginAnimationVariantsName.TEXT_VISIBLE);
    inputPassStateAnimCtrls.start(loginAnimationVariantsName.INPUT_HIDDEN);
    inputPhoneStateAnimCtrls.start(loginAnimationVariantsName.INPUT_VISIBLE);
  };

  const toPassState = () => {
    navPhoneStateAnimCtrls.start(loginAnimationVariantsName.NAV_BAR_HIDDEN);
    navPassStateAnimCtrls.start(loginAnimationVariantsName.NAV_BAR_VISIBLE);
    textPassStateAnimCtrls.start(loginAnimationVariantsName.TEXT_VISIBLE);
    textPhoneStateAnimCtrls.start(loginAnimationVariantsName.TEXT_HIDDEN);
    inputPassStateAnimCtrls.start(loginAnimationVariantsName.INPUT_VISIBLE);
    inputPhoneStateAnimCtrls.start(loginAnimationVariantsName.INPUT_HIDDEN);
  };

  const showError = () => {
    errorAnimCtrls.start(loginAnimationVariantsName.ERROR_VISIBLE);
  };

  const hideError = () => {
    errorAnimCtrls.start(loginAnimationVariantsName.ERROR_HIDDEN);
  };

  const shakeError = () => {
    errorAnimCtrls.start(loginAnimationVariantsName.SHAKE);
  };

  const back = () => {
    setLoginStates(LoginStates.PHONE_STATE);
  };

  const login = async () => {
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
      setLoginStates(LoginStates.PASSWORD_STATE);
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
    if (loginState === LoginStates.PHONE_STATE) {
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
  }, [loginState]);

  useEffect(() => {
    authState.isAuthenticated && route.push("/");
  }, [authState.isAuthenticated]);

  return (
    <>
      <div className={styles["body"]}>
        <div className={styles["body__blur"]}>
          <Image src={Logo} alt="" className={styles["logo"]} />
          <motion.div
            initial={loginAnimationVariantsName.VISIBLE}
            animate={textPhoneStateAnimCtrls}
            variants={loginAnimationVariants}
            className={styles["welcome__container"]}
          >
            Welcome !
            <p>
              Login to start <span>RentEverything</span>
            </p>
          </motion.div>
          <motion.div
            initial={loginAnimationVariantsName.HIDDEN}
            animate={textPassStateAnimCtrls}
            variants={loginAnimationVariants}
            className={styles["welcome__container"]}
          >
            <p>We need your password to start</p>
          </motion.div>
          <div className={styles["horizontal-line"]}></div>
          <div className={styles["input__container"]}>
            <motion.input
              initial={loginAnimationVariantsName.INPUT_VISIBLE}
              animate={inputPhoneStateAnimCtrls}
              variants={loginAnimationVariants}
              type="text"
              placeholder="Phone"
              className={styles["input"]}
              onChange={(event) => {
                setPhoneNumber(event.target.value);
              }}
            ></motion.input>
            <motion.input
              initial={loginAnimationVariantsName.INPUT_HIDDEN}
              animate={inputPassStateAnimCtrls}
              variants={loginAnimationVariants}
              type="text"
              placeholder="Password"
              className={styles["input"]}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            ></motion.input>
          </div>
          <motion.div
            initial={loginAnimationVariantsName.ERROR_HIDDEN}
            animate={errorAnimCtrls}
            variants={loginAnimationVariants}
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
              initial={loginAnimationVariantsName.NAV_BAR_VISIBLE}
              animate={navPhoneStateAnimCtrls}
              variants={loginAnimationVariants}
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
              initial={loginAnimationVariantsName.NAV_BAR_HIDDEN}
              animate={navPassStateAnimCtrls}
              variants={loginAnimationVariants}
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
                  login();
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
