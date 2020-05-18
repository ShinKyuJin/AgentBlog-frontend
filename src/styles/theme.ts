import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    background-color: #FDFDFD;
  }

  a {
    text-decoration: none;
    color: black;
  }

  *:focus {
    outline: none;
  }
`;

export default GlobalStyles;