import React, { useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import PostList from "../containers/PostList/PostList";
import Sidebar from "../components/Sidebar";
import Theme from "../styles/theme";

const Home = () => {
  document.body.style.backgroundColor = Theme.homeBgColor;
  useEffect(() => {
    return () => {
      document.body.style.backgroundColor = Theme.bgColor;
    };
  }, []);
  return (
    <Container>
      <Helmet>
        <title>Agents Blog!</title>
      </Helmet>
      <PostList />
      <Sidebar />
    </Container>
  );
};

const Container = styled.div`
  ${(prop) => prop.theme.responsiveContainer}
  display: flex;
  justify-content: center;
  height: 100%;
  margin-top: 2rem;
`;

export default Home;
