import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  buttonStyle?: "sucess";
}

const UnderlineButton: React.FC<ButtonProps> = ({
  text,
  buttonStyle = "success",
  className,
  onClick,
  disabled,
  ...props
}) => {
  return (
    <SuccessContainer
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {text}
    </SuccessContainer>
  );
};

const SuccessContainer = styled.button`
  display: inline-flex;
  border: 0px;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  font-size: 15px;
  background-color: ${(props) =>
    props.disabled ? props.theme.darkGreyColor : props.theme.greenColor};
  text-align: center;
  padding: 0px 1.25rem;
  align-items: center;
  justify-content: center;
  height: 40px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.disabled
        ? props.theme.darkGreyColor
        : props.theme.focusedGreenColor};
  }
`;

export default UnderlineButton;
