import React from "react";
import Register from "../components/Register/Register";
import Head from "next/head";
function RegisterPage() {
  return (
    <>
      <Head>
        <title>Register</title>
        <meta
          name="register"
          content="width=device-width, initial-scale=1.0"
        />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Register />
    </>
  );
}

export default RegisterPage;
