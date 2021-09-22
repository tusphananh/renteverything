import Head from "next/head";
// import Auth from "../components/Auth/Auth";
import { useGetItemsByNameQuery } from "../graphql-generated/graphql";

const Home = () => {
  const onLogin = async () => {
    const { data } = useGetItemsByNameQuery({ variables: { name: "apple" } });
    console.log(data);
  };
  return (
    <>
      <Head>
        <title>Rent Everything</title>
        <meta
          name="description"
          content="Rent Everything is an application that helps you find and rent everything around you."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button
        onClick={() => {
          onLogin();
        }}
      >
        Login
      </button>
      {/* <Auth></Auth> */}
    </>
  );
};

export default Home;
