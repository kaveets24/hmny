import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import App from "./components/App";

// Stylesheets, Google Fonts & Font-Awesome
import "./style/index.scss";
import 'font-awesome/css/font-awesome.min.css';


const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

console.log("Hey there"); 