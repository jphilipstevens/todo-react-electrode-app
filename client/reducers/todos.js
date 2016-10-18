import Actions from "../actions/todo";

const strategy = {
  [Actions.LOAD_MESSAGES]: toggleTodo,
  default: (state) => state
};

const toggleTodo = (state, action) => {
  return state.id !== action.id ?
    state :
    Object.assign({}, state, {
      completed: !state.completed
    });
};

const todo = (state = {}, action) => {
  return (strategy[action.type] || strategy.default)(state, action);
};

export default todo;
