import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface CloseButtionProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const CloseButton: React.FunctionComponent<CloseButtionProps> = (props) => (
  <Button {...props}>
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      height="24px"
      width="24px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
    </svg>
  </Button>
);

const Button = styled.button`
  background: none;
  border: none;
`;

export default CloseButton;
//<button {...props}>X</button>
