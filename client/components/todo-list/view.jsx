import React, { PropTypes } from "react";
import Todo from "../todo";

const createTodo = (onTodoClick) => (todo) => (
  <Todo
    key={todo.id}
    {...todo}
    onClick={() => onTodoClick(todo.id)}
  />
);

const TodoList = ({ todos, onTodoClick }) => (
  <section>
    <h1>My Todos!</h1>
    {todos.map(createTodo(onTodoClick))}
  </section>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired
};

export default TodoList;
