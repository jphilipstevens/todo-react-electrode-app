//this is a subbed out database
const database = [{
  id: 1,
  completed: true,
  description: "start a Todo React App"
}];

const TodoService = {};

TodoService.getAllTodos = () => database;

export default TodoService;
