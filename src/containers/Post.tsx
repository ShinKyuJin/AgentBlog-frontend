import React from 'react';
import styled from 'styled-components';
import Dummy from '../assets/dummy.png';

const Container = styled.div`
  @media (min-width: 768px) {
    width: 200px;
  }
  border-radius: 3px;
  width: 100px;
`;

const StyledImage = styled.img`
  width: 100%;
`;

const Post = () => {
  return (
    <Container>
      <StyledImage src={Dummy} alt="Dummy" />
    </Container>
  );
}

export default Post;