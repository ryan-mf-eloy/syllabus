import http from "node:http";

import Router from "./routes/Router.js";
import routesFactory from "./routes/routesFactory.js";

import Middleware from "./http/Middleware.js";

import multer from "multer";

const upload = multer();
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
      const isImportRoute =
        request.url === "/task/import" &&
        request.method.toLowerCase() === "post";

      if (isUpload && isImportRoute) {
        upload.fields([
          { name: "userId" },
          { name: "workSpaceId" },
          { name: "tasks", maxCount: 1 },
        ])(request, response, (error) => {
          if (error)
            return response
              .writeHead(400)
              .end(
                "Error uploading. Field name is not valid or multiple files selected."
              );

          request.files = request.files.tasks[0];
          request.body = request.body;
        });
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
