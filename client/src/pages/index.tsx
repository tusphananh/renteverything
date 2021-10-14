import Head from "next/head";
import Auth from "../components/Auth/Auth";
import { FC } from "react";

const Home: FC = () => {
  return (
    <>
      <Head>
        <title>Rent Everything</title>
        <meta name="homepage" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/logo.ico" />
      </Head>

      <body>
        <Auth></Auth>
      </body>
    </>
  );
};

export default Home;
