import React, { HTMLAttributes } from "react";
import styled from "styled-components";

interface FatTextProps extends HTMLAttributes<HTMLElement> {
  text: string;
  color?: string;
}

const FatText: React.FC<FatTextProps> = ({ text, ...props }) => (
  <Text {...props}>{text}</Text>
);

const Text = styled.span`
  font-weight: 600;
  color: ${(props) => props.color};
`;

export default FatText;
