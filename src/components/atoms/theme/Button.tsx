import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { IconProps, Icon } from "./Icon";
import Theme from "../../../styles/theme";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  buttonType?: "containd" | "outlined" | "text";
  colorStyle?: "warning" | "sucess" | "lightGrey";
  icon?: Pick<IconProps, "type" | "size">;
}

const colorStyleSheet = {
  sucess: {
    default: Theme.greenColor,
    focused: Theme.focusedGreenColor,
    text: `rgb(18, 184, 134)`,
    textFocused: `rgb(195, 250, 232)`,
  },
  warning: {
    default: Theme.redColor,
    focused: Theme.focusedRedColor,
    text: Theme.redColor,
    textFocused: Theme.focusedRedColor,
  },
  lightGrey: {
    default: `rgb(73, 80, 87)`,
    focused: `rgb(240, 240, 240)`,
    text: `inherit`,
    textFocused: `rgb(240, 240, 240)`,
  },
};

const Button: React.FC<ButtonProps> = ({
  text,
  buttonType = "containd",
  colorStyle = "sucess",
  icon,
  className,
  onClick,
  disabled,
  ...props
}) => {
  const containerProps = {
    className,
    onClick,
    disabled,
    colorStyle: colorStyleSheet[colorStyle] as any,
    ...props,
  };
  let innerContent = <div>{text}</div>;

  if (icon) {
    innerContent = (
      <>
        <Icon {...icon} />
        <TextContainer>{text}</TextContainer>
      </>
    );
  }

  const Container = {
    containd: (
      <ContainedButton {...containerProps}>{innerContent}</ContainedButton>
    ),
    outlined: (
      <OutlinedButton {...containerProps}>{innerContent}</OutlinedButton>
    ),
    text: <TextButton {...containerProps}>{innerContent}</TextButton>,
  };
  return Container[buttonType];
};

interface ButtonContainerProps {
  colorStyle: {
    default: string;
    focused: string;
    text: string;
    textFocused: string;
  };
}

const TextContainer = styled.div`
  margin-left: 0.8rem;
`;

const ContainedButton = styled.button<ButtonContainerProps>`
  display: inline-flex;
  border: 0px;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  font-size: 15px;
  background-color: ${(props) =>
    props.disabled ? props.theme.darkGreyColor : props.colorStyle.default};
  text-align: center;
  padding: 0px;
  align-items: center;
  justify-content: center;
  height: 40px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.disabled ? props.theme.darkGreyColor : props.colorStyle.focused};
  }
`;

const OutlinedButton = styled.button<ButtonContainerProps>`
  display: inline-flex;
  border: 0px;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  font-size: 15px;
  background-color: ${(props) =>
    props.disabled ? props.theme.darkGreyColor : props.colorStyle.default};
  text-align: center;
  padding: 0px;
  align-items: center;
  justify-content: center;
  height: 40px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.disabled ? props.theme.darkGreyColor : props.colorStyle.focused};
  }
`;

const TextButton = styled.button<ButtonContainerProps>`
  display: inline-flex;
  border: 0px;
  border-radius: ${(props) => props.theme.borderRadius};
  color: ${(props) =>
    props.disabled ? props.theme.darkGreyColor : props.colorStyle.text};
  font-weight: 600;
  font-size: 15px;
  background-color: inherit;
  text-align: center;
  padding: 0px;
  align-items: center;
  justify-content: center;
  height: 40px;
  cursor: pointer;

  transition: background-color 0.05s;
  &:hover {
    background-color: ${(props) =>
      props.disabled ? `inherit` : props.colorStyle.textFocused};
  }
`;

export default Button;
