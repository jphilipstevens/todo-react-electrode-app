import React, {PropTypes} from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import NavigationClose from "material-ui/svg-icons/navigation/close";

const determineStyle = (completed) => (
  completed
    ? { textDecoration: "line-through"}
    : {}
);

const TodoTitle = ({text, completed}) => <span style={determineStyle(completed)}> {text} </span>;

const Todo = ({onClick, completed, text}) => (
    <AppBar
      title={<TodoTitle text={text} completed={completed} />}
      onTitleTouchTap={onClick}
      iconElementLeft={<IconButton> <NavigationClose/> </IconButton>}
    />
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

export default Todo;
