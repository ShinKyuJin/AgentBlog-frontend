import { gql, InMemoryCache } from "@apollo/client";

export const defaults = {
  query: gql`
    {
      isLoggedIn
    }
  `,
  data: { isLoggedIn: Boolean(localStorage.getItem("token")) || false },
};

export const resolvers = {
  Mutation: {
    logUserIn: (
      _: any,
      { token }: { token: string },
      { cache }: { cache: InMemoryCache }
    ) => {
      localStorage.setItem("token", token);
      window.location.reload();
      return null;
    },
    logUserOut: (_: any, __: any, { cache }: { cache: InMemoryCache }) => {
      localStorage.removeItem("token");
      window.location.assign("/");

      return null;
    },
  },
};
