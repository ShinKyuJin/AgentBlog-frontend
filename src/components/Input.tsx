import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface InputProps extends InputHTMLAttributes<HTMLButtonElement> {
  onChange?: any;
  onKeyPress?: any;
}

const Input = ({
  placeholder,
  required = true,
  value,
  onChange,
  onKeyPress,
  type,
  className,
}: InputProps) => (
  <Container
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    onKeyPress={onKeyPress}
    type={type}
    className={className}
  />
);

const Container = styled.input`
  width: 380px;
  border: none;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.bgColor};
  height: 30px;
  font-size: 15px;
  padding: 5px 15px;
`;
export default Input;
