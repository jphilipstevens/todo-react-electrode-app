import todos from "./todos";

const config = {
  connections: {
    default: {
      port: 9000,
      compression: false
    }
  }
};

require("electrode-server")(config)
  .then((server) => {
    server.route(todos);
  });
