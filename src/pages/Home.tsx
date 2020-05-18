import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  @media (min-width: 768px) {
    width: 768px;
  }
  width: 1024px;
  margin: 0 auto;
  background-color: #FFFFFF;
  border: 1px solid black;
`

const Home = () => {
  return (
    <Container>
      Hello?
    </Container>
  )
}

export default Home;