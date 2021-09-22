import Head from "next/head";
import Auth from "../components/Auth/Auth";
import { AuthProvider } from "../contexts/authContext";

const Home = () => {
  return (
    <>
      <Head>
        <title>Rent Everything</title>
        <meta
          name="description"
          content="Rent Everything is an application that helps you find and rent everything around you."
        />
      </Head>
      <AuthProvider>
        <Auth></Auth>
      </AuthProvider>
    </>
  );
};

export default Home;
