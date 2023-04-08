import http from "node:http";

import Router from "./routes/Router.js";
import routesFactory from "./routes/routesFactory.js";

import Middleware from "./http/Middleware.js";

class Server {
  constructor(middleware, router, routesFactory) {
    this.middleware = middleware;
    this.router = router;
    this.routesFactory = routesFactory;

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
      this.router.setHttpInfo(request, response);
      this.router.redirect();
    });

    this.routesFactory(this.router);

    return server;
  }
}

new Server(new Middleware(), Router, routesFactory);
