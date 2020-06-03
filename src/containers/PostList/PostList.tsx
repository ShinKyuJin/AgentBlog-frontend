import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { seeMainData, QUERY_POSTS } from "./PostListQueries";
import PostCard from "../../components/PostCard";

const PostList = () => {
  const { data } = useQuery<seeMainData>(QUERY_POSTS);
  const mappingCard = data?.seeMain.map((postInfo) => (
    <PostCard postInfo={postInfo} />
  ));
  return (
    <Container>
      <GridContainer>{mappingCard}</GridContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const GridContainer = styled.div`
  margin: auto 15px;
  width: 100%;
  display: grid;
  grid-gap: 25px;
  @media (max-width: 945px) {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
  @media (min-width: 946px) {
    grid-template-columns: repeat(auto-fit, 320px);
  }
  grid-template-rows: 380px;
  grid-auto-rows: 380px;
`;

export default PostList;
