import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface HashtagPrpps {
  name: string;
}
const Hashtag: React.FC<HashtagPrpps> = ({ name }) => (
  <Container to={`/tags/${name}`}>{name}</Container>
);

const Container = styled(Link)`
  align-self: center;
  color: white;
  width: 70px;
  margin-right: 30px;
  border-radius: 30px;
  background-color: rgba(12, 166, 120, 0.3);
  color: white;
  text-decoration: none;

  border: 0px;
  font-weight: 600;
  font-size: 15px;
  text-align: center;
  padding: 10px 15px;
`;

export default Hashtag;
