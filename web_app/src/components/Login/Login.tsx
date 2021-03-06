import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import {
  LoginErrorAnimation,
  LoginInputAnimation,
  LoginNavBarAnimation,
  LoginTextAnimation,
} from "../../animations/LoginAnimations";
import NextBtn from "../../assets/icons/next-btn.svg";
import Logo from "../../assets/icons/logo-light.svg";
import {
  loginAnimationVariantsName,
  LoginStates,
} from "../../constants/LoginConstants";
import { useAuthContext } from "../../contexts/authContext";
import {
  isPasswordValid,
  isPhoneNumberValid,
} from "../../utils/inputValidator";
import styles from "./Login.module.scss";

interface error {
  isError: boolean;
  message: string;
}

const initialErrors: error = {
  isError: false,
  message: "",
};

const Login: FC = () => {
  const route = useRouter();
  const { authState, authLogin } = useAuthContext();
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<error>(initialErrors);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [LoginState, setLoginStates] = React.useState<LoginStates>(
    LoginStates.PHONE_STATE
  );

  const back = () => {
    setLoginStates(LoginStates.PHONE_STATE);
    setError(initialErrors);
  };

  const login = async () => {
    if (isPasswordValid(password)) {
      if (authState.errors && authState.errors.length > 0) {
        console.log(authState.errors);
        setError({
          isError: true,
          message: authState.errors![0].message,
        });
      } else setError(initialErrors);

      await authLogin(phoneNumber, password);
    } else {
      setError({
        isError: true,
        message:
          "Password must be at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
      });
    }
  };
  const next = () => {
    if (isPhoneNumberValid(phoneNumber)) {
      setError(initialErrors);
      setLoginStates(LoginStates.PASSWORD_STATE);
    } else {
      setError({
        isError: true,
        message: "Please enter a valid phone number",
      });
    }
  };

  useEffect(() => {
    if (authState.isAuthenticated) {
      setError(initialErrors);
      route.push("/");
    }

    if (
      !authState.isAuthenticated &&
      authState.errors &&
      authState.errors.length > 0
    ) {
      setError({
        isError: true,
        message: authState.errors![0].message,
      });
    }
  }, [authState]);

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["container__blur"]}>
          <Logo alt="" className={styles["logo"]} />
          <LoginTextAnimation
            isVisible={LoginState === LoginStates.PHONE_STATE}
            className={styles["welcome__container"]}
          >
            Welcome !
            <p>
              Login to start <span>RentEverything</span>
            </p>
          </LoginTextAnimation>
          <LoginTextAnimation
            initial={loginAnimationVariantsName.TEXT_HIDDEN}
            isVisible={LoginState === LoginStates.PASSWORD_STATE}
            className={styles["welcome__container"]}
          >
            <p>We need your password to start</p>
          </LoginTextAnimation>
          <div className={styles["horizontal-line"]}></div>
          <div className={styles["input__container"]}>
            <LoginInputAnimation
              isVisible={LoginState === LoginStates.PHONE_STATE}
              type="text"
              placeholder="Phone"
              className={styles["input"]}
              onChange={(event) => {
                setPhoneNumber(event.target.value);
                setError(initialErrors);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && next();
              }}
            ></LoginInputAnimation>
            <LoginInputAnimation
              isVisible={LoginState === LoginStates.PASSWORD_STATE}
              initial={loginAnimationVariantsName.INPUT_HIDDEN}
              type="password"
              placeholder="Password"
              className={styles["input"]}
              onChange={(event) => {
                setPassword(event.target.value);
                setError(initialErrors);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && login();
              }}
            ></LoginInputAnimation>
          </div>
          <LoginErrorAnimation
            initial={loginAnimationVariantsName.ERROR_HIDDEN}
            isVisible={error.isError}
            className={styles["error"]}
          >
            {error.message}
          </LoginErrorAnimation>
          <div className={styles["link"]}>
            <a href="/register">
              Don???t have an account ? <span>Register now</span>
            </a>
            <a href="/forgot-password">Forgot your password ?</a>
          </div>
          <div className={styles["bottom-nav-bar"]}>
            <LoginNavBarAnimation
              isVisible={LoginState === LoginStates.PHONE_STATE}
              className={styles["bottom-nav-bar__container"]}
            >
              <button
                className={styles["confirm-btn"]}
                onClick={() => {
                  next();
                }}
              >
                {authState.isFetching ? (
                  <Loading />
                ) : (
                  <NextBtn alt="next-btn" width="130px" height="55px" />
                )}
              </button>
            </LoginNavBarAnimation>
            <LoginNavBarAnimation
              initial={loginAnimationVariantsName.NAV_BAR_HIDDEN}
              isVisible={LoginState === LoginStates.PASSWORD_STATE}
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
                className={styles["login-btn"]}
                onClick={() => {
                  login();
                }}
              >
                {authState.isFetching ? <Loading /> : <p>Start</p>}
              </button>
            </LoginNavBarAnimation>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

const Loading: FC = () => {
  return (
    <div className={styles["loading"]}>
      <div className={styles["lds-spinner"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
