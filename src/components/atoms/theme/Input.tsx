import React, { InputHTMLAttributes, FC } from "react";
import styled from "styled-components";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = ({ ...props }) => <Container {...props} />;

const Container = styled.input`
  width: 300px;
  border: none;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.bgColor};
  height: 40px;
  font-size: 15px;
  padding: 5px 15px;
`;
export default Input;
