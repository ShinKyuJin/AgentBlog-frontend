import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

const Container = styled.div`
  width: 1024px;
  margin: 0 auto;
  background-color: #FFFFFF;
  border: 1px solid black;
`

const Home = () => {
  return (
    <Container>
      <Helmet>
        <title>Agents Blog!</title>
      </Helmet>
    </Container>
  )
}

export default Home;