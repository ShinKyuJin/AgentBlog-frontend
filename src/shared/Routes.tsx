import React from "react";
import Home from "../pages/Home";
import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "../pages/Auth";
import PostDetail from "../pages/PostDetail";
import UserHome from "../pages/UserHome";
import Search from "../pages/Search";
import WritePost from "../pages/WritePost";
import Tags from "../pages/Tags";

interface RoutesProps {
  isLoggedIn: boolean;
}

const RoutesList = [
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
    path: "/write", // Create and edit post
    component: WritePost,
  },
  {
    path: "/search",
    component: Search,
  },
  {
    path: "/tags/:tagname",
    component: Tags,
  },
];

const Routes: React.FunctionComponent<RoutesProps> = (props) => {
  return (
    <Switch>
      {RoutesList.map((route) => {
        return <Route exact {...route} />;
      })}
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
