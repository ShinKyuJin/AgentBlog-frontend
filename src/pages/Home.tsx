import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";



const Container = styled.div`
`;

const Home = () => {
  return (
    <Container>
      <Helmet>
        <title>Agents Blog!</title>
      </Helmet>
      Home
    </Container>
  );
};

export default Home;
