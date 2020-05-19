import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

const Container = styled.div`
  width: 1024px;
  margin: 0 auto;
  background-color: #ffffff;
  border: 1px solid black;
`;

const WritePost = () => {
  return (
    <Container>
      <Helmet>
        <title>Agents Blog!</title>
      </Helmet>
      WritePost
    </Container>
  );
};

export default WritePost;
