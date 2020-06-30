import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { LOG_OUT } from "../modal/Auth/AuthQueries";
import PulseLoader from "react-spinners/PulseLoader";
import styled from "styled-components";
import MyErrorBoundary from "../components/ErrorBoundary";

const Home = lazy(() => import("../pages/Home"));
const Auth = lazy(() => import("../pages/Auth"));
const PostDetail = lazy(() => import("../pages/PostDetail"));
const UserHome = lazy(() => import("../pages/UserHome"));
const WritePost = lazy(() => import("../pages/WritePost"));
const Setting = lazy(() => import("../pages/Setting"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const Search = lazy(() => import("../pages/Search"));
const SearchHashtag = lazy(() => import("../pages/SearchHashtag"));

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
    <MyErrorBoundary>
      <Suspense
        fallback={
          <LoadingContainer>
            <PulseLoader size={15} color={"#36D7B7"} />
          </LoadingContainer>
        }
      >
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
      </Suspense>
    </MyErrorBoundary>
  );
};

const LoadingContainer = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Routes;
