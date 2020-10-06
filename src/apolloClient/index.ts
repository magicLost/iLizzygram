import { useMemo } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
//import { InMemoryCache } from "apollo-cache-inmemory";
//import { HttpLink } from "apollo-link-http";
//import gql from "graphql-tag";
import { createUploadLink } from "apollo-upload-client";
//import { createPersistedQueryLink } from "apollo-link-persisted-queries";
//@ts-ignore
//import merge from "lodash.merge";
//import { schema as mainSchema } from "./schema";
//import { resolvers as mainResolvers } from "./resolvers";
//import { ALERT } from "./queries";
import { cache } from "./cache";

const isServer = typeof window === "undefined";

//${userSchema}
/* const typeDefs = gql`
  ${mainSchema}
`; */

let apolloClient = undefined;
//userResolvers
//export const resolvers = merge({}, mainResolvers);

/* const httpLink = new HttpLink({
  //uri: isServer ? "http://our_local_address" : "http://cdn_address"
  uri: "http://localhost:3009/graphql",
  //credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
}); */

const uploadLink = createUploadLink({
  uri: "http://localhost:3009/graphql",
  //uri: "http://192.168.1.231:3009/graphql",
  headers: {
    "keep-alive": "true",
  },
});

//const links = ApolloLink.from([httpLink, uploadLink]);

/*  */
function createApolloClient() {
  return new ApolloClient({
    ssrMode: isServer,
    link: uploadLink,
    cache,
    //resolvers,
    //typeDefs,
  });
}

//const link = new HttpLink({ uri: "http://localhost:3000/graphql" });
/* const link = createPersistedQueryLink({ useGETForHashedQueries: true }).concat(
  createHttpLink({ uri: "http://localhost:3005/graphql" })
); */

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
