import "babel-polyfill";
import "whatwg-fetch";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Todos from "./components/todo-list";

const App = (
  <Todos />
);

ReactDOM.render(App, document.querySelector(".App"));
