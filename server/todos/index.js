import TodoService from "./service";

const route = {
  method: "GET",
  path: "/todos",
  handler: (request, reply) => {
    reply(TodoService.getAllTodos());
  }
};

const TodoPlugin = {};

TodoPlugin.register = (server, options, next) => {
  server.route(route);
  return next();
};

TodoPlugin.register.attributes = {
  name: "componentData",
  version: "1.0.0"
};

export default TodoPlugin;
