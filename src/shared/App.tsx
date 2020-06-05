import React from "react";
import Header from "../components/Header/HeaderContainer";
import styled, { ThemeProvider } from "styled-components";
import Theme from "../styles/theme";
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import GlobalStyles from "../styles/GlobalStyles";

const App = () => {
  const isLoggedIn: boolean = useQuery(LOGIN_QUERY).data.isLoggedIn;

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <React.Fragment>
        <Wrapper>
          <Header isLoggedIn={isLoggedIn} />
          <Routes isLoggedIn={isLoggedIn} />
        </Wrapper>
      </React.Fragment>
      <ToastContainer position={"bottom-left"} />
    </ThemeProvider>
  );
};

const LOGIN_QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
  height: 100%;
`;

//background-color: ${(props) => props.theme.bgColor};

export default App;
