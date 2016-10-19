import todos from "./todos";
import webServer from "electrode-server";

const config = {
  connections: {
    default: {
      port: 9000,
      compression: false
    }
  }
};

webServer(config).then((server) => server.route(todos));
