import React from 'react';
import styled from 'styled-components';

const Container = styled.input`
  border: none;
  border: ${props => props.theme.boxBorder};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.bgColor};
  height: 35px;
  font-size: 12px;
  padding: 0px 15px;
`

interface InputProps {
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: any;
  type?: string;
  className?: string;
}

const Input = ({
  placeholder,
  required = true,
  value,
  onChange,
  type,
  className
}: InputProps) => (
  <Container
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
    className={className}
  />
)

export default Input;