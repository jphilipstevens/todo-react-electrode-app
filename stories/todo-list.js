import React from "react";
import TodoList from "../client/components/todo-list/view";

import { storiesOf, action } from "@kadira/storybook";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const todos = [
  {
    id: 1,
    completed: false,
    text: "Todo 1"
  },
  {
    id: 2,
    completed: true,
    text: "Todo 2"
  },
  {
    id: 3,
    completed: false,
    text: "Todo 3"
  }];

storiesOf("Todo Item", module)
  .addDecorator((story) => (
    <MuiThemeProvider>
      {story()}
    </MuiThemeProvider>
  ))
  .add("list of a few todos", () => (
    <TodoList todos={todos} onTodoClick={() => {}} />
  ));
