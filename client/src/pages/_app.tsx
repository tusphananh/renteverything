import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../contexts/authContext";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../libs/apolloClient";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
}
export default MyApp;
