import React, { ButtonHTMLAttributes } from "react";

interface CloseButtionProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const CloseButton: React.FunctionComponent<CloseButtionProps> = (props) => (
  <button {...props}>X</button>
);

export default CloseButton;
