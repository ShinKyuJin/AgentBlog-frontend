import React, { useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import PostList from "../containers/PostList/PostList";
import Sidebar from "../components/Sidebar";
import Theme from "../styles/theme";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    document.body.style.backgroundColor = Theme.homeBgColor;
    return () => {
      document.body.style.backgroundColor = Theme.bgColor;
    };
  }, []);

  return (
    <Container>
      <Helmet>
        <title>Agent Blog</title>
      </Helmet>
      <TabContainer>
        <TabButton>트렌딩</TabButton>
        <TabButton>최신</TabButton>
      </TabContainer>
      <ContentContainer>
        <PostList />
        <Sidebar />
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  ${(prop) => prop.theme.responsiveContainer}
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 2rem;
`;

const ContentContainer = styled.div`
  display: flex;
`;

const TabContainer = styled.div`
  width: 14rem;
  display: flex;
`;

const TabButton = styled.div`
  width: 7rem;
  display: flex;
  justify-content: center;
  font-size: 1.125rem;
  height: 3rem;
  text-decoration: none;
  cursor: pointer;
`;

export default Home;
