import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { configureFakeBackend } from "./helpers/FakeBackend";

configureFakeBackend();
ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
