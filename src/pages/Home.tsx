import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import PostList from "../containers/PostList/PostList";
import Sidebar from "../components/Sidebar";

const Container = styled.div`
  display: flex;
  height: 100%;
  margin: 0 100px;
`;

const Home = () => {
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

export default Home;
