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
      cache.writeData({
        data: {
          isLoggedIn: true,
        },
      });
      window.location.assign("/");
      return null;
    },
    logUserOut: () => {
      localStorage.removeItem("token");
      window.location.assign("/");
      return null;
    },
  },
};
