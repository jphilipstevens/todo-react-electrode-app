import getAllTodos from "./get-all-todos";

const TodoPlugin = {};

TodoPlugin.register = (server, options, next) => {
  server.route({
    method: "GET",
    path: "/todos",
    handler: (request, reply) => {
      reply(getAllTodos());
    }
  });

  return next();
};

TodoPlugin.register.attributes = {
  name: "componentData",
  version: "1.0.0"
};

export default TodoPlugin;
