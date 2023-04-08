import TaskController from "../controllers/TaskController.js";
import UserController from "../controllers/UserController.js";

const routesFactory = (router) => {
  // Default API
  router.get("/", (request, response) => response.writeHead(200).end());

  // Task
  router.get("/task", TaskController.get);
  router.post("/task", TaskController.create);
  router.post("/task/import", TaskController.import);
  router.patch("/task/:id/complete", TaskController.complete);
  router.put("/task/:id", TaskController.update);
  router.delete("/task/:id", TaskController.delete);

  // User
  router.get("/user", UserController.get);
  router.post("/user", UserController.create);
  router.put("/user/:id", UserController.update);
  router.delete("/user/:id", UserController.delete);
};

export default routesFactory;
