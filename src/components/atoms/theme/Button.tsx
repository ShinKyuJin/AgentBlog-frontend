import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  buttonStyle?: "warning" | "sucess";
}

const Button: React.FC<ButtonProps> = ({
  text,
  buttonStyle = "success",
  className,
  onClick,
  disabled,
  ...props
}) => {
  if (buttonStyle === "warning") {
    return (
      <WarningContainer
        className={className}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {text}
      </WarningContainer>
    );
  } else {
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
  }
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
`;
const WarningContainer = styled.button`
  display: inline-flex;
  border: 0px;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  font-size: 15px;
  background-color: ${(props) =>
    props.disabled ? props.theme.darkGreyColor : props.theme.redColor};
  text-align: center;
  padding: 0px 1.25rem;
  align-items: center;
  justify-content: center;
  height: 40px;
  cursor: pointer;
`;
export default Button;
