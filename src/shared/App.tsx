import React from "react";
import Header from "../components/Header/HeaderContainer";
import styled, { ThemeProvider } from "styled-components";
import Theme from "../styles/Theme";
import Routes from "./Routes";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";

const LOGIN_QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  margin: 100px auto;
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
`;

const App = () => {
  const isLoggedIn: boolean = useQuery(LOGIN_QUERY).data.isLoggedIn;

  return (
    <ThemeProvider theme={Theme}>
      <React.Fragment>
        <Header />
        <Wrapper>
          <Routes isLoggedIn={isLoggedIn} />
        </Wrapper>
      </React.Fragment>
    </ThemeProvider>
  );
};

export default App;
