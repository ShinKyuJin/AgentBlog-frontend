import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { seeMainData, QUERY_POSTS } from "./PostListQueries";
import PostCard from "../../components/PostCard";

const PostList = () => {
  const { data } = useQuery<seeMainData>(QUERY_POSTS);
  console.log(data);
  const mappingCard = data?.seeMain.map((post) => (
    <PostCard
      file_url={post.files.length > 0 ? post.files[0].url : null}
      title={post.title}
      content={post.content}
      createdAt={post.createdAt}
      commentCount={post.commentCount}
      avatar={post.user.avatar}
      username={post.user.username}
    />
  ));
  return <Container>{mappingCard}</Container>;
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default PostList;
