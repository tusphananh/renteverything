import Head from "next/head";
import React, { useEffect, useState, FC } from "react";
import { useAuth } from "../contexts/authContext";
import { useRouter } from "next/router";
import styles from "../styles/SignIn.module.scss";
import { LoginStates } from "../constants/LoginConstants";

const Login: FC = () => {
  const route = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { authState, authLogin } = useAuth();
  const [loginState, setLoginState] = useState(LoginStates.PHONE_STATE);

  useEffect(() => {
    authState.isAuthenticated && route.push("/");
  }, [authState.isAuthenticated, route]);

  const onLogin = async () => {
    await authLogin(phone, password);
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="Rent Everything is an application that helps you find and rent everything around you."
        />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <body className={styles.body}>
        <div>
          <h1>Login</h1>
          <h6>{authState.message}</h6>
          <input
            type="text"
            placeholder="Phone"
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button
            onClick={() => {
              onLogin();
            }}
          >
            Login
          </button>
        </div>
      </body>
    </>
  );
};

export default Login;
