import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

type matchParams = {
  id: string;
}

const Container = styled.div`
`

const PostDetail = () => {
  const { id } = useParams() as matchParams;
  return (
    <Container>
      
    </Container>
  );
}

export default PostDetail;