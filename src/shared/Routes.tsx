import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { LOG_OUT } from "../components/modules/modal/Auth/AuthQueries";
import PulseLoader from "react-spinners/PulseLoader";
import styled from "styled-components";
import MyErrorBoundary from "../components/atoms/system/ErrorBoundary";
import { gql, useMutation, useQuery } from "@apollo/client";

const Home = lazy(() => import("../components/pages/Home"));
const Auth = lazy(() => import("../components/pages/Auth"));
const PostDetail = lazy(() => import("../components/pages/PostDetail"));
const UserHome = lazy(() => import("../components/pages/UserHome"));
const WritePost = lazy(() => import("../components/pages/WritePost"));
const Setting = lazy(() => import("../components/pages/Setting"));
const PageNotFound = lazy(() => import("../components/pages/PageNotFound"));
const LoginRequired = lazy(() => import("../components/pages/LoginRequired"));
const Search = lazy(() => import("../components/pages/Search"));
const SearchHashtag = lazy(() => import("../components/pages/SearchHashtag"));

interface RoutesProps {
  isLoggedIn: boolean;
}

const QUERY_CHECK_TOKEN = gql`
  {
    checkToken
    refreshToken
  }
`;

const JWT_EXPIRY_TIME = 15 * 60 * 1000; // 15 minuts

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
  const { data, refetch } = useQuery(QUERY_CHECK_TOKEN);
  const [logOutMutation] = useMutation(LOG_OUT);

  if (data) {
    const { refreshToken, checkToken } = data;
    if (refreshToken !== "") {
      localStorage.setItem("token", refreshToken);
      setTimeout(() => refetch(), JWT_EXPIRY_TIME - 60000); // Access Token 만료 1분전 로그인 연장
    } else if (isLoggedIn && checkToken === false) {
      logOutMutation();
    }
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
                path={route.path}
                component={isLoggedIn ? route.component : LoginRequired}
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
