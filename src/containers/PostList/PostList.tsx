import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { seeMainData, QUERY_POSTS } from "./PostListQueries";
import PostCard from "../../components/PostCard";

const PostList = () => {
  const { data, loading } = useQuery<seeMainData>(QUERY_POSTS);

  const loadingCard = Array.from({ length: 20 }, (x, i) => i).map(() => (
    <PostCard loading={true} />
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
  flex-wrap: wrap;
  margin: -1rem;
`;

const Main = styled.main`
  flex: 1 1 0%;
  margin-top: 50px;
`;

export default PostList;
