import { toggleTodo } from "../../action-creators/todo";

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    }
  };
};

export {
  mapStateToProps,
  mapDispatchToProps
};
