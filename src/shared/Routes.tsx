import React from "react";
import Home from "../pages/Home";
import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "../pages/Auth";
import PostDetail from "../pages/PostDetail";
import UserHome from "../pages/UserHome";
import Search from "../pages/Search/Search";
import WritePost from "../pages/WritePost";
import Setting from "../pages/Setting";
import SearchHashtag from "../pages/SearchHashtag";
import { useQuery, useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { LOG_OUT } from "../modal/Auth/AuthQueries";
import PageNotFound from "../pages/PageNotFound";

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
  let i = 0;
  return (
    <Switch>
      {RoutesListWithoutLogin.map((route) => {
        return <Route exact {...route} key={i++} />;
      })}
      {RoutesListWithLogin.map((route) => {
        return <Route exact {...route} key={i++} />;
      })}
      <Route path="/" component={PageNotFound} key={i++} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
