import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { seeMainData, QUERY_POSTS } from "./PostListQueries";
import PostCard from "../../components/PostCard";

const PostList = () => {
  const { data, loading } = useQuery<seeMainData>(QUERY_POSTS);

  const loadingCard = Array.from({ length: 20 }, (x, i) => i).map(() => (
    <PostCard />
  ));
  const mappingCard = data?.seeMain.map((postInfo) => (
    <PostCard postInfo={postInfo} />
  ));
  return (
    <Main>
      <Container>{loading ? loadingCard : mappingCard}</Container>
    </Main>
  );
};

const Container = styled.div`
  display: grid;
  @media (max-width: 945px) {
    grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
  }
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, 320px);
  margin-left: 5px;
  margin-right: 5px;
  justify-content: center;
  flex-wrap: wrap;
`;

const Main = styled.main`
  @media (max-width: 945px) {
    width: 100%;
  }
  width: 80%;
  margin-top: 50px;
`;

export default PostList;
