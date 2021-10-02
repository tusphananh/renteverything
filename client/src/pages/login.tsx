import React, { FC } from "react";
import Login from "../components/Login/Login";
import Head from "next/head";
const LoginPage: FC = () => {
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
      <Login />
    </>
  );
};

export default LoginPage;
