import React from "react";
import Register from "../components/Register/Register";
import Head from "next/head";
function RegisterPage() {
  return (
    <>
      <Head>
        <title>Register</title>
        <meta
          name="description"
          content="Rent Everything is an application that helps you find and rent everything around you."
        />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Register />
    </>
  );
}

export default RegisterPage;
