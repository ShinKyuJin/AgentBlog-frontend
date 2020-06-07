import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

export const serverUri = "http://localhost:4000"; //"https://agent-blog.herokuapp.com"; //"http://localhost:4000";

export default new ApolloClient({
  uri: serverUri,
  clientState: {
    defaults,
    resolvers,
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
