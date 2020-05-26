import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo-hooks";
import App from "../shared/App";
import Client from "../Apollo/Client";

const Root = () => {
  return (
    <ApolloProvider client={Client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default Root;
