import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
// import { createUploadLink } from "apollo-upload-client";
import merge from "deepmerge";
import { IncomingHttpHeaders } from "http";
import isEqual from "lodash/isEqual";
import { useMemo } from "react";
import { ApolloConstant } from "../constants/ApolloConstant";

let apolloClient: ApolloClient<NormalizedCacheObject>;

interface IApolloStateProps {
  [ApolloConstant.APOLLO_STATE_PROP_NAME]?: NormalizedCacheObject;
}
function createApolloClient(headers: IncomingHttpHeaders | null = null) {
  const enhancedFetch = (url: RequestInfo, init: RequestInit) => {
    return fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Credentials": "true",
        // "Access-Control-Request-Headers" : "Content-Type, Authorization",
        Cookie: headers?.cookie ?? "",
      },
    });
  };

  const httpLink = new HttpLink({
    // uri: 'http://localhost:4000/graphql', // Server URL (must be absolute)
    uri: process.env.NEXT_PUBLIC_GRAPHQL_HOST,
    credentials: "include", // Additional fetch() options like `credentials` or `headers`
    fetch: enhancedFetch,
  });

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV !== "production",
  });

  client &&
    console.log("GrapQL connected: ", process.env.NEXT_PUBLIC_GRAPHQL_HOST);
  return client;
}

export function initializeApollo(
  {
    headers,
    initialState,
  }: {
    headers?: IncomingHttpHeaders | null;
    initialState?: NormalizedCacheObject | null;
  } = { headers: null, initialState: null }
) {
  const _apolloClient = apolloClient ?? createApolloClient(headers);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: { props: IApolloStateProps }
) {
  if (pageProps?.props) {
    pageProps.props[ApolloConstant.APOLLO_STATE_PROP_NAME] =
      client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: IApolloStateProps) {
  const state = pageProps[ApolloConstant.APOLLO_STATE_PROP_NAME];
  const store = useMemo(
    () => initializeApollo({ initialState: state }),
    [state]
  );
  return store;
}
