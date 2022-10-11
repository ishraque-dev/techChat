import React from "react";
import ReactDOM from "react-dom/client";
import firebaseConfig from "./FirabaseConfig";
import "./style.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
