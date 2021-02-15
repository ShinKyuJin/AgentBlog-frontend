import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from "crypto-hash";
import { defaults, resolvers } from "./LocalState";

// export const serverUri = "https://agent-blog.herokuapp.com";
export const serverUri = "http://localhost:4000";

const link = ApolloLink.from([
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
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  credentials: "include",
  resolvers,
});

cache.writeQuery(defaults);
