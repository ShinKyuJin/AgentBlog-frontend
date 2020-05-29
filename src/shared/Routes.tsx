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

interface RoutesProps {
  isLoggedIn: boolean;
}

const RoutesListWithoutLogin = [
  {
    path: "/",
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
  return (
    <Switch>
      {RoutesListWithoutLogin.map((route) => {
        return <Route exact {...route} />;
      })}
      {
        RoutesListWithLogin.map((route) => {
          return <Route exact {...route} />;
        })}
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
