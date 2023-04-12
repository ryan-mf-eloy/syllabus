import WorkSpaceController from "../controllers/WorkSpaceController.js";
import TaskController from "../controllers/TaskController.js";
import UserController from "../controllers/UserController.js";

const routesFactory = (router) => {
  // Default
  router.get("/", (request, response) =>
    response.writeHead(200).end("NodeJS Fundamentals Challenge API")
  );

  // WorkSpace
  router.get("/workspace", (request, response) =>
    WorkSpaceController.get(request, response)
  );
  router.post("/workspace", (request, response) =>
    WorkSpaceController.create(request, response)
  );
  router.put("/workspace/:id", (request, response) =>
    WorkSpaceController.update(request, response)
  );
  router.delete("/workspace/:id", (request, response) =>
    WorkSpaceController.delete(request, response)
  );

  // Task
  router.get("/task", (request, response) =>
    TaskController.get(request, response)
  );
  router.post("/task", (request, response) =>
    TaskController.create(request, response)
  );
  router.post("/task/import", (request, response) =>
    TaskController.import(request, response)
  );
  router.patch("/task/:id/complete", (request, response) =>
    TaskController.complete(request, response)
  );
  router.put("/task/:id", (request, response) =>
    TaskController.update(request, response)
  );
  router.delete("/task/:id", (request, response) =>
    TaskController.delete(request, response)
  );

  // User
  router.get("/user", (request, response) =>
    UserController.get(request, response)
  );
  router.post("/user", (request, response) =>
    UserController.create(request, response)
  );
  router.put("/user/:id", (request, response) =>
    UserController.update(request, response)
  );
  router.delete("/user/:id", (request, response) =>
    UserController.delete(request, response)
  );
};

export default routesFactory;
