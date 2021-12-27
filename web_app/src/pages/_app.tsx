import type { AppProps } from "next/app";
import { AuthProvider } from "../contexts/authContext";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../libs/apolloClient";
import "../styles/globals.css";
import { SearchProvider } from "../contexts/searchContext";
import { ActivitiesProvider } from "../contexts/activitiesContext";
import { SocketProvider } from "../contexts/socketContext";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <SocketProvider>
          <SearchProvider>
            <SocketProvider>
              <ActivitiesProvider>
                <Component {...pageProps} />
              </ActivitiesProvider>
            </SocketProvider>
          </SearchProvider>
        </SocketProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
export default MyApp;
