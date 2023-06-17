import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

import App from "./App.jsx";

import "./index.css";
import store from "./store.js";
import "react-tabs/style/react-tabs.css";
import 'react-accessible-accordion/dist/fancy-example.css';

if (!import.meta.env.VITE_REACT_APP_TOMCAT) {
  console.warn("Missing Backend Endpoint");
}

const tomcat = import.meta.env.VITE_REACT_APP_TOMCAT;

const httpLink = createHttpLink({
  uri: tomcat ? tomcat : "http://127.0.0.1:8000/graphql/",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
});

export const removeItemFromCache = (type, id) => {
  const cacheKey = cache.identify({ __typename: type, id });
  cache.evict(cacheKey);
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
