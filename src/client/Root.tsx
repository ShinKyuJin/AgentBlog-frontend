import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo-hooks";
import App from "../shared/App";
import Client from "../Apollo/Client";
import { Provider } from "react-redux";
import store from "../store";

const Root = () => {
  return (
    <ApolloProvider client={Client}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  );
};

export default Root;
