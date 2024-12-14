import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./apolloClient";
import { LanguageProvider } from "./Translations/LanguageContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LanguageProvider>
    <ApolloProvider client={apolloClient}>
    <App />
    </ApolloProvider >
    </LanguageProvider>
  </React.StrictMode>
);
