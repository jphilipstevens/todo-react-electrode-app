import TodoActions from "../actions/todo";
import TodoService from "../services/todo-service";

export const toggleTodo = (todoId) => {
  return {
    type: TodoActions.TOGGLE,
    meta: {
      todoId
    }
  };
};

export const addTodoError = (error) => ({
  type: TodoActions.ADD_ERROR,
  payload: {
    error
  }
});

export const addTodoAction = (todo) => ({
  type: TodoActions.ADD,
  payload: todo
});

export const addTodo = (text) => (dispatch) => {
  TodoService.add({text, completed: false})
    .then(
      (todo) => dispatch(addTodoAction(todo)),
      (error) => dispatch(addTodoError(error))
  );
};
