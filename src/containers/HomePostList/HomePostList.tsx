import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { seeMainData, QUERY_POSTS } from "./HomePostListQueries";
import HomePostCard from "../../components/HomePostCard";

const HomePostList = () => {
  const { data, loading, error } = useQuery<seeMainData>(QUERY_POSTS);

  const loadingCard = Array.from({ length: 20 }, (x, i) => i).map(() => (
    <HomePostCard />
  ));
  const mappingCard = data?.seeMain.map((postInfo) => (
    <HomePostCard postInfo={postInfo} />
  ));
  return (
    <Main>
      <Container>{loading || error ? loadingCard : mappingCard}</Container>
    </Main>
  );
};

const Container = styled.div`
  @media (max-width: 767px) {
    margin: 0px;
  }
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  margin: -1rem;
`;

const Main = styled.main``;

export default HomePostList;
