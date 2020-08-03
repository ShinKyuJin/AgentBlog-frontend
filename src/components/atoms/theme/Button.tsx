import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  className,
  onClick,
  disabled,
}) => (
  <Container className={className} onClick={onClick} disabled={disabled}>
    {text}
  </Container>
);

const Container = styled.button`
  width: 380px;
  border: 0px;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  font-size: 15px;
  background-color: ${(props) =>
    props.disabled ? props.theme.darkGreyColor : props.theme.greenColor};
  text-align: center;
  padding: 10px 15px;
  height: 40px;
  cursor: pointer;
`;

export default Button;
