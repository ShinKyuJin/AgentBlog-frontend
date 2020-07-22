import { InMemoryCache } from "apollo-boost";

export const defaults = {
  isLoggedIn: Boolean(localStorage.getItem("token")) || false,
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
