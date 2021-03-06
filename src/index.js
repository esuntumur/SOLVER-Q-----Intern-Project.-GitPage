import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import combineReducers from "./redux/reducers";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const store = createStore(combineReducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
