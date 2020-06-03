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
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: -1rem;
`;

const Main = styled.main`
  width: 80%;
  margin-top: 50px;
`;

export default PostList;
