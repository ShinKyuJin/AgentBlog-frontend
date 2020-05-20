import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

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
