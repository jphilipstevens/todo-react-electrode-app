import React from "react";
import Todo from "../client/components/todo";
import { storiesOf, action } from "@kadira/storybook";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

storiesOf("Todo Item", module)
  .addDecorator((story) => (
    <MuiThemeProvider>
      {story()}
    </MuiThemeProvider>
  ))
  .add("not completed", () => (
    <Todo onClick={() => {}} text={"I am a TODO item"} completed={false} />
  ))
  .add("completed", () => (
    <Todo onClick={() => {}} text={"I am a TODO item"} completed={true} />
  ));
