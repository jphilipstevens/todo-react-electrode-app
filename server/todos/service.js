import uuid from "node-uuid";

//this is a subbed out database
const database = [{
  id: uuid.v4(),
  completed: true,
  description: "start a Todo React App"
}];

const TodoService = {};

TodoService.getAllTodos = () => database;

const createTodo = ({completed = false, description = ""}) => {
  return Object.assign({id: uuid.v4()}, {completed, description});
};

TodoService.addTodo = ({completed = false, description = ""}) => {
  const todo = createTodo(completed, description);
  database.push(todo);
  return todo;
};

export default TodoService;
