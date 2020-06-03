import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { seeMainData, QUERY_POSTS } from "./PostListQueries";
import PostCard from "../../components/PostCard";
import Skeleton from "react-loading-skeleton";

const PostList = () => {
  const { data, loading } = useQuery<seeMainData>(QUERY_POSTS);

  const loadingCard = Array.from({ length: 20 }, (x, i) => i).map(() => (
    <LoadingContainer>
      <Skeleton height={377} />
    </LoadingContainer>
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

const LoadingContainer = styled.div`
  width: 320px;
  height: 377px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  margin: 1rem;
  flex-direction: column;
  border-radius: 8px;
  position: relative;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;

  -webkit-transition: -webkit-transform 0.4s;
  transition: transform 0.4s;
  &:hover {
    transform: translateY(-10px);
  }
`;

export default PostList;
