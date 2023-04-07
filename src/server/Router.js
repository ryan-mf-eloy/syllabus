import TaskController from "../controllers/TaskController.js";
import UserController from "../controllers/UserController.js";

export default class Router {
  redirectHandler(request, response) {
    const { method, url: resource } = request;

    const routes = new Map();
    // DEFAULT
    routes.set("[GET]/", () => response.writeHead(200).end());
    routes.set("[POST]/", () => response.writeHead(200).end());
    routes.set("[PUT]/", () => response.writeHead(200).end());
    routes.set("[DELETE]/", () => response.writeHead(200).end());

    // TASK
    routes.set("[GET]/task", () => TaskController.get(request, response));
    routes.set("[POST]/task", () => TaskController.create(request, response));
    routes.set("[POST]/task/import", () =>
      TaskController.create(request, response)
    );
    routes.set("[PUT]/task/:id", () =>
      TaskController.update(request, response)
    );
    routes.set("[DELETE]/task/:id", () =>
      TaskController.delete(request, response)
    );

    // USER
    routes.set("[GET]/user", () => UserController.get(request, response));
    routes.set("[POST]/user", () => UserController.create(request, response));
    routes.set("[PUT]/use/:id", () => UserController.update(request, response));
    routes.set("[DELETE]/user/:id", () =>
      UserController.delete(request, response)
    );

    const requestedRoute = routes.get(`[${method}]${resource}`);

    return requestedRoute
      ? requestedRoute()
      : response.writeHead(404).end("Page not found");
  }
}
