import UserController from "./controllers/UserController.js";

import urlParametersInterpreter from "./urlParametersInterpreter.js";

export const routes = [
  {
    method: "GET",
    resource: urlParametersInterpreter("/users"),
    handler: (request, response) => UserController.getAll(request, response),
  },
  {
    method: "POST",
    resource: urlParametersInterpreter("/users"),
    handler: (request, response) => UserController.create(request, response),
  },
  {
    method: "PUT",
    resource: urlParametersInterpreter("/users/:id"),
    handler: (request, response) => UserController.update(request, response),
  },
  {
    method: "PATCH",
    resource: urlParametersInterpreter("/users/:id"),
    handler: (request, response) => UserController.update(request, response),
  },
  {
    method: "DELETE",
    resource: urlParametersInterpreter("/users/:id"),
    handler: (request, response) => UserController.delete(request, response),
  },
];
