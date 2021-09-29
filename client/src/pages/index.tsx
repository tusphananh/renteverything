import Head from "next/head";
import Auth from "../components/Auth/Auth";
import { FC } from "react";
const Home: FC = () => {
  return (
    <>
      <Head>
        <title>Rent Everything</title>
        <meta
          name="description"
          content="Rent Everything is an application that helps you find and rent everything around you."
        />
        <link rel="icon" href="/logo.ico" />
      </Head>

      <Auth></Auth>
    </>
  );
};

export default Home;
