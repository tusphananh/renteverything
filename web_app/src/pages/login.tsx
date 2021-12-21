import React, { FC } from "react";
import Login from "../components/Login/Login";
import Head from "next/head";
const LoginPage: FC = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="login" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <body>
        <Login />
      </body>
    </>
  );
};

export default LoginPage;
