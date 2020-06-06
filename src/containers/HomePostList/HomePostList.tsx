import React, { FC } from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import {
  seeLatestPostData,
  seeTrendyPostData,
  QUERY_LATEST_POST,
  QUERY_TRENDY_POST,
} from "./HomePostListQueries";
import HomePostCard from "../../components/HomePostCard";

interface HomePostListProps {
  postType: "trend" | "recent";
}

const HomePostList: FC<HomePostListProps> = ({ postType }) => {
  const {
    data: trendData,
    loading: trendLoading,
    error: trendError,
  } = useQuery<seeTrendyPostData>(QUERY_TRENDY_POST, {
    skip: postType === "recent",
  });
  const {
    data: recentData,
    loading: recentLoading,
    error: recentError,
  } = useQuery<seeLatestPostData>(QUERY_LATEST_POST, {
    skip: postType === "trend",
  });

  let post, loading, error;
  if (postType === "trend") {
    [post, loading, error] = [
      trendData?.seeTrendyPost,
      trendLoading,
      trendError,
    ];
  } else if (postType === "recent") {
    [post, loading, error] = [
      recentData?.seeLatestPost,
      recentLoading,
      recentError,
    ];
  }

  const loadingCard = Array.from({ length: 20 }).map(() => <HomePostCard />);
  const mappingCard = post
    ? post.map((postInfo) => <HomePostCard postInfo={postInfo} />)
    : null;
  return (
    <Main>
      <Container>
        {loading || !post || error ? loadingCard : mappingCard}
      </Container>
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
