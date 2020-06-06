import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface HashtagPrpps {
  name: string;
}
const Hashtag: React.FC<HashtagPrpps> = ({ name }) => (
  <HashtagContainer to={`/tags/${name}`}>{name}</HashtagContainer>
);

const HashtagContainer = styled(Link)`
  @media (max-width: 768px) {
    height: 1.5rem;
    font-size: 0.75rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 0.75rem;
  }
  display: inline-flex;
  align-items: center;
  height: 2rem;
  padding: 0px 1rem;
  margin-bottom: 0.875rem;
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
