import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isDark?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  isDark = false,
  className,
  onClick,
  disabled,
}) => (
  <Container className={className} onClick={onClick} disabled={disabled}>
    {text}
  </Container>
);

const Container = styled.button`
  width: 100%;
  border: 0px;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: ${(props) =>
    props.disabled ? props.theme.darkGreyColor : props.theme.blueColor};
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
`;

export default Button;
