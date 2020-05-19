import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const Container = styled.div`
  width: 1024px;
  margin: 0 auto;
  background-color: #ffffff;
  border: 1px solid black;
`;

interface UserHomeParams {
  username: string;
}

const UserHome = () => {
  const { username } = useParams() as UserHomeParams;

  return (
    <Container>
      <Helmet>
        <title>Agents Blog!</title>
      </Helmet>
      {username}'s UserHome
    </Container>
  );
};

export default UserHome;
