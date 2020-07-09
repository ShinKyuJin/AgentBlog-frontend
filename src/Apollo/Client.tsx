import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

export const serverUri = "https://agent-blog.herokuapp.com"; //"https://agent-blog.herokuapp.com"; //"http://localhost:4000";

// const link = createHttpLink({
//   uri: '/graphql',
//   credentials: 'same-origin'
// });

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
