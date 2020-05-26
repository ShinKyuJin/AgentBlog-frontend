import React from 'react';
import styled from 'styled-components';

interface PostProps {
  text: string;
}

const Container = styled.div`
`

const TextContainer = styled.div`
  width: 150px;
  height: 75px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media (max-width: 944px) {
    width: calc(50% - 2rem)
    height: 75px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  }
`

const Post = ({ text }: PostProps) => {
  return (
    <Container>
      <TextContainer>
        {text}
      </TextContainer>
    </Container>
  );
}

export default Post;