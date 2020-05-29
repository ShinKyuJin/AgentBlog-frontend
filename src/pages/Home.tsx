import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Device from '../styles/devices';
import PostList from "../containers/PostList";


const Container = styled.div`
  ${Device.map((devices) => (
    `@media (min-width: ${devices.size}) {
      max-width: ${devices.size}
    }`
  ))}
`;

const Home = () => {
  return (
    <Container>
      <Helmet>
        <title>Agents Blog!</title>
      </Helmet>
      <PostList />
    </Container>
  );
};

export default Home;
