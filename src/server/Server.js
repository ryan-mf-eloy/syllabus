import http from "node:http";

import Router from "./routes/Router.js";
import routesFactory from "./routes/routesFactory.js";

import Middleware from "./http/Middleware.js";

import formidable from "formidable";

class Server {
  constructor(middleware, router, routesFactory) {
    this.middleware = middleware;
    this.router = router;
    this.routesFactory = routesFactory;

    this.#init();
  }

  async #init() {
    const server = await this.#build();
    server.listen(3000);
  }

  async #build() {
    const server = http.createServer(async (request, response) => {
      // Upload
      const contentType = request?.headers["content-type"];
      const isUpload = contentType
        ? contentType.startsWith("multipart/form-data")
        : false;

      if (isUpload) {
        const formPromise = await new Promise((resolve, reject) => {
          const form = formidable({ multiples: true });

          form.parse(request, (error, fields, files) => {
            if (error) return response.writeHead(400).end(`${error}`);

            resolve({ fields, files });
          });
        });

        request.body = { ...formPromise.fields };
        request.files = { ...formPromise.files };
      }

      // Middleware
      this.middleware.setHeaders(response);
      const readableResponse =
        await this.middleware.setStreamsWithResponseMiddleware(
          request,
          response
        );
      request.body = { ...request.body, ...readableResponse };

      // Router
      this.router.setHttpInfo(request, response);
      this.router.redirect();
    });

    this.routesFactory(this.router);

    return server;
  }
}

new Server(new Middleware(), Router, routesFactory);
