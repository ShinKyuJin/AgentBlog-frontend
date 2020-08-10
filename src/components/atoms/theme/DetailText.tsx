import React, { HTMLAttributes } from "react";
import styled from "styled-components";

interface DetailTextProps extends HTMLAttributes<HTMLElement> {
  text: string;
  color?: string;
}

const DetailText: React.FC<DetailTextProps> = ({ text, ...props }) => (
  <Text {...props}>{text}</Text>
);

const Text = styled.span`
  font-size: 0.875rem;
  color: rgb(134, 142, 150);
`;

export default DetailText;
