import Head from "next/head";
import Login from "../components/Auth/Login";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="Rent Everything is an application that helps you find and rent everything around you."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login></Login>
    </>
  );
};

export default LoginPage;
