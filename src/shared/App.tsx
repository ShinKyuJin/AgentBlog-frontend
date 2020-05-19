import React from "react";
import GlobalStyles from "../styles/GlobalStyles";
import Header from "../components/Header";
import styled, { ThemeProvider } from "styled-components";
import Theme from "../styles/theme";
import Routes from "./Routes";

const Wrapper = styled.div`
  margin: 100px auto;
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
`;

const App = () => {
  const isLoggedIn = false;

  return (
    <ThemeProvider theme={Theme}>
      <React.Fragment>
        <GlobalStyles />
        <Header />
        <Wrapper>
          <Routes isLoggedIn={isLoggedIn} />
        </Wrapper>
      </React.Fragment>
    </ThemeProvider>
  );
};

export default App;
