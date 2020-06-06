import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface HashtagPrpps {
  name: string;
}
const Hashtag: React.FC<HashtagPrpps> = ({ name }) => (
  <HashtagContainer to={`/tags/${name}`}>{name}</HashtagContainer>
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

const HashtagContainer = styled(Link)`
  display: inline-flex;
  align-items: center;
  height: 2rem;
  padding: 0px 1rem;
  background-color: rgb(241, 243, 245);

  color: rgb(12, 166, 120);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  border-radius: 1rem;

  & + & {
    margin-left: 10px;
  }

  transition: background-color 0.08s ease-out 0s;
  &:hover {
    background-color: rgb(249, 249, 250);
  }
`;

export default Hashtag;
