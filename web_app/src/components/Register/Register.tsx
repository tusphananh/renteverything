import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import {
  RegisterErrorAnimation, RegisterInformationAnimation, RegisterInputAnimation,
  RegisterNavBarAnimation,
  RegisterTextAnimation
} from "../../animations/RegisterAnimations";
import Logo from "../../assets/icons/logo-light.svg";
import NextBtn from "../../assets/icons/next-btn.svg";
import StartBtn from "../../assets/icons/start-btn.svg";
import {
  registerAnimationVariantsName, RegisterStates
} from "../../constants/RegisterConstants";
import { useAuthContext } from "../../contexts/authContext";
import {
  isFirstNameValid,
  isLastNameValid,
  isPasswordValid,
  isPhoneNumberValid
} from "../../utils/inputValidator";
import styles from "./Register.module.scss";

interface error {
  isError: boolean;
  message: string;
}
const initialError: error = {
  isError: false,
  message: "",
};
const Register: FC = () => {
  const route = useRouter();
  const { authState, authRegsiter } = useAuthContext();
  const [password, setPassword] = React.useState("");
  const [rePassword, setRePassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [error, setError] = React.useState<error>(initialError);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [registerState, setregisterStates] = React.useState<RegisterStates>(
    RegisterStates.PHONE_STATE
  );

  const back = () => {
    setregisterStates(RegisterStates.PHONE_STATE);
    setError(initialError);
  };

  const register = async () => {
    if (!isLastNameValid(lastName) || !isFirstNameValid(firstName)) {
      setError({
        isError: true,
        message: "Name must be at least 2 character except number",
      });
    } else if (!isPasswordValid(password)) {
      setError({
        isError: true,
        message:
          "Password must be at least 8 character, 1 number, 1 uppercase and 1 lowercase",
      });
    } else if (password !== rePassword) {
      setError({
        isError: true,
        message: "Password and re-password must be same",
      });
    } else {
      setError(initialError);
      authRegsiter(phoneNumber, firstName, lastName, password);
    }
  };
  const next = () => {
    if (isPhoneNumberValid(phoneNumber)) {
      setError(initialError);
      setregisterStates(RegisterStates.INFORMATION_STATE);
    } else {
      setError({
        isError: true,
        message: "Please input valid phone number",
      });
    }
  };

  useEffect(() => {
    if (
      !authState.isAuthenticated &&
      authState.errors &&
      authState.errors.length > 0
    ) {
      setError({
        isError: true,
        message: authState.errors![0].message,
      });
    } else if (authState.isAuthenticated) {
      setError(initialError);
      route.push("/");
    }
  }, [authState]);

  return (
    <div className={styles["body"]}>
      <Logo src={Logo} alt="" className={styles["logo"]} />
      <RegisterTextAnimation
        isVisible={registerState === RegisterStates.PHONE_STATE}
        className={styles["welcome__container"]}
      >
        Welcome !
        <p>
          Register to start <span>RentEverything</span>
        </p>
      </RegisterTextAnimation>
      <RegisterTextAnimation
        initial={registerAnimationVariantsName.TEXT_HIDDEN}
        isVisible={registerState === RegisterStates.INFORMATION_STATE}
        className={styles["welcome__container"]}
      >
        <p>We need your password to start</p>
      </RegisterTextAnimation>
      <div className={styles["horizontal-line"]}></div>
      <div className={styles["input__container"]}>
        <div className={styles["input__container--phone"]}>
          <RegisterInputAnimation
            isVisible={registerState === RegisterStates.PHONE_STATE}
            type="text"
            placeholder="Phone"
            className={styles["input"]}
            onChange={(event) => {
              setPhoneNumber(event.target.value);
              setError(initialError);
            }}
          ></RegisterInputAnimation>
        </div>
        <RegisterInformationAnimation
          initial={registerAnimationVariantsName.INFORMATION_HIDDEN}
          isVisible={registerState === RegisterStates.INFORMATION_STATE}
          className={styles["input__container--information"]}
        >
          <div className={styles["input-name__container"]}>
            <RegisterInputAnimation
              isVisible={registerState === RegisterStates.INFORMATION_STATE}
              type="text"
              placeholder="First Name"
              className={styles["input-name"]}
              onChange={(event) => {
                setFirstName(event.target.value);
                setError(initialError);
              }}
            ></RegisterInputAnimation>
            <div className={styles["vertical-line"]}></div>
            <RegisterInputAnimation
              isVisible={registerState === RegisterStates.INFORMATION_STATE}
              type="text"
              placeholder="Last Name"
              className={styles["input-name"]}
              onChange={(event) => {
                setLastName(event.target.value);
                setError(initialError);
              }}
            ></RegisterInputAnimation>
          </div>

          <RegisterInputAnimation
            isVisible={registerState === RegisterStates.INFORMATION_STATE}
            type="password"
            placeholder="Password"
            className={styles["input"]}
            onChange={(event) => {
              setPassword(event.target.value);
              setError(initialError);
            }}
          ></RegisterInputAnimation>

          <RegisterInputAnimation
            isVisible={registerState === RegisterStates.INFORMATION_STATE}
            type="password"
            placeholder="Re-Enter Password"
            className={styles["input"]}
            onChange={(event) => {
              setRePassword(event.target.value);
              setError(initialError);
            }}
          ></RegisterInputAnimation>
        </RegisterInformationAnimation>
      </div>
      <RegisterErrorAnimation
        initial={registerAnimationVariantsName.ERROR_HIDDEN}
        isVisible={error.isError}
        className={styles["error"]}
      >
        {error.message}
      </RegisterErrorAnimation>
      <div className={styles["link"]}>
        <a href="/login">
          Already have an account ? <span>Login now</span>
        </a>
      </div>
      <div className={styles["bottom-nav-bar__container"]}>
        <RegisterNavBarAnimation
          isVisible={registerState === RegisterStates.PHONE_STATE}
          className={styles["bottom-nav-bar"]}
        >
          <button
            className={styles["bottom-nav-bar__next-btn"]}
            onClick={() => {
              next();
            }}
          >
            <NextBtn alt="next-btn" width="130px" height="55px" />
          </button>
        </RegisterNavBarAnimation>
        <RegisterNavBarAnimation
          initial={registerAnimationVariantsName.NAV_BAR_HIDDEN}
          isVisible={registerState === RegisterStates.INFORMATION_STATE}
          className={styles["bottom-nav-bar"]}
        >
          <button
            className={styles["bottom-nav-bar__back-btn"]}
            onClick={() => {
              back();
            }}
          >
            Go back
          </button>
          <div className={styles["vertical-line"]}> </div>
          <button
            className={styles["bottom-nav-bar__register-btn"]}
            onClick={() => {
              register();
            }}
          >
            <StartBtn alt="start-btn" width="130px" height="55px" />
          </button>
        </RegisterNavBarAnimation>
      </div>
    </div>
  );
};

export default Register;
