import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }  

  body {
    background-color: rgba(33, 37, 41, 0.008);
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
