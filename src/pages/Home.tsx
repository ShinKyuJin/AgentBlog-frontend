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
  display: flex;
  justify-content: center;
  margin: 0 15px;
  height: 100%;
`;

export default Home;
