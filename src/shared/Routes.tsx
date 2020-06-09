import React, { useEffect } from "react";
import Home from "../pages/Home";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Auth from "../pages/Auth";
import PostDetail from "../pages/PostDetail";
import UserHome from "../pages/UserHome";
import WritePost from "../pages/WritePost";
import Setting from "../pages/Setting";
import { useQuery, useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { LOG_OUT } from "../modal/Auth/AuthQueries";
import PageNotFound from "../pages/PageNotFound";
import Search from "../pages/Search";
import SearchHashtag from "../pages/SearchHashtag";

interface RoutesProps {
  isLoggedIn: boolean;
}

const QUERY_CHECK_TOKEN = gql`
  {
    checkToken
  }
`;

const RoutesListWithoutLogin = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/recent",
    component: Home,
  },
  {
    path: "/auth",
    component: Auth,
  },
  {
    path: "/@:username",
    component: UserHome,
  },
  {
    path: "/@:username/:posturl",
    component: PostDetail,
  },

  {
    path: "/search",
    component: Search,
  },
  {
    path: "/tags/:tagname",
    component: SearchHashtag,
  },
];

const RoutesListWithLogin = [
  {
    path: "/write", // Create and edit post
    component: WritePost,
  },
  {
    path: "/setting", // Create and edit post
    component: Setting,
  },
];

const Routes: React.FunctionComponent<RoutesProps> = ({ isLoggedIn }) => {
  const { data } = useQuery(QUERY_CHECK_TOKEN);
  const [logOutMutation] = useMutation(LOG_OUT);

  if (isLoggedIn && data && data.checkToken === false) {
    logOutMutation();
  }

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Switch>
      {RoutesListWithoutLogin.map((route, i) => {
        return <Route exact {...route} key={i} />;
      })}
      {RoutesListWithLogin.map((route, i) => {
        return (
          <Route
            exact
            {...route}
            key={i}
            onUpdate={() => window.scrollTo(0, 0)}
          />
        );
      })}
      <Route path="/" component={PageNotFound} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
