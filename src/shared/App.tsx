import React from "react";
import Header from "../components/Header/HeaderContainer";
import styled, { ThemeProvider } from "styled-components";
import Theme from "../styles/theme";
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import Uploader from "../components/Uploader";

const LOGIN_QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
  background-color: ${(props) => props.theme.bgColor};
  height: 100%;
`;

const App = () => {
  const isLoggedIn: boolean = useQuery(LOGIN_QUERY).data.isLoggedIn;

  return (
    <ThemeProvider theme={Theme}>
      <React.Fragment>
        <Header isLoggedIn={isLoggedIn} />
        <Wrapper>
          <Uploader />
          <Routes isLoggedIn={isLoggedIn} />
        </Wrapper>
      </React.Fragment>
      <ToastContainer position={"bottom-left"} />
    </ThemeProvider>
  );
};

export default App;
