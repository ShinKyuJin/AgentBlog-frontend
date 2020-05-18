import React from 'react';
import styled from 'styled-components';
import Posts from '../containers/Posts';
import { Helmet } from 'react-helmet';

const Container = styled.div`
  @media (min-width: 1300px) {
    width: 1300px;
  }
  @media (min-width: 1024px) {
    width: 1024px;
  }
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
      <Helmet>
        <title>Agents Blog!</title>
      </Helmet>
      <Posts />
    </Container>
  )
}

export default Home;