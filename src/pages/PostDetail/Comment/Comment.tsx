import React from 'react';
import styled from 'styled-components';
import Avatar from '../../../components/Avatar';

interface CommentProps {
  text: string;
  user: {
    avatar: string;
    username: string;  
  }
  createdAt: string;
}

interface CommentData {
  info: CommentProps
}

const Comment: React.FC<CommentData> = ({ info }) => {
  return (
    <Container>
      <Avatar url={info.user.avatar} size="sm" />
      {info.text}
      {info.createdAt}
      {info.user.username}
    </Container>
  );
}

const Container = styled.div`
`

export default Comment;