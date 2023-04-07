import http from "node:http";

import Router from "./Router.js";
import Middleware from "./Middleware.js";

class Server {
  constructor(middleware, router) {
    this.middleware = middleware;
    this.router = router;

    this.#init(this.#build());
  }

  #init(server) {
    server.listen(3000);
  }

  #build() {
    const server = http.createServer((request, response) => {
      // Middleware
      this.middleware.setHeaders(response);

      // Router
      this.router.redirectHandler(
        request,
        response,
        this.middleware.routeParamsInterpreter
      );
    });

    return server;
  }
}

new Server(new Middleware(), new Router());
