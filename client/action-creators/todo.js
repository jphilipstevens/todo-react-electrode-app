import TodoActions from "../actions/todo";

export const toggleTodo = (id) => {
  return {
    type: TodoActions.TOGGLE,
    id
  };
};
