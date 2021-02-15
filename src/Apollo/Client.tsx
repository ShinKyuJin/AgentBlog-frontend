import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from "crypto-hash";
import { defaults, resolvers } from "./LocalState";

export const serverUri = "https://agent-blog.herokuapp.com";
//export const serverUri = "http://localhost:4000";

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");
  const authorizationHeader = token ? `Bearer ${token}` : null;
  operation.setContext({
    headers: {
      authorization: authorizationHeader,
    },
  });

  return forward(operation);
});
const link = ApolloLink.from([
  middlewareAuthLink,
  createPersistedQueryLink({
    sha256,
    useGETForHashedQueries: true,
  }),
  createHttpLink({ uri: serverUri, useGETForQueries: false }),
]);

const cache = new InMemoryCache();

export default new ApolloClient({
  cache: cache,
  link,
  credentials: "include",
  resolvers,
});

cache.writeQuery(defaults);
