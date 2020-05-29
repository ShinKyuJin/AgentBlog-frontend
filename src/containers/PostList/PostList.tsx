import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { seeMainData, QUERY_POSTS } from './PostListQueries';
import PostCard from '../../components/PostCard';

const PostList = () => {
  const { data } = useQuery<seeMainData>(QUERY_POSTS);
  const mappingCard = data?.posts.map((seeMain) => (
    <PostCard
      file_url={seeMain.files[0].url}
      title={seeMain.title}
      content={seeMain.content}
      createdAt={seeMain.createdAt}
      commentCount={parseInt(seeMain.commentCount, 10)}
      avatar={seeMain.user.avatar}
      username={seeMain.user.username}
    />
  ));
  return (
    <Container>
      {mappingCard}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export default PostList;