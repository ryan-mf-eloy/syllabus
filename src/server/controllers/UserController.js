import UUID from "../../infra/shared/libs/UUID.js";

import CreateUserService from "../../services/CreateUserService.js";
import UpdateUserService from "../../services/UpdateUserService.js";
import DeleteUserService from "../../services/DeleteUserService.js";
import GetUserService from "../../services/GetUserService.js";

import ORM from "../../infra/database/orm.js";

import CreateUserRepository from "../../infra/database/repositories/user/CreateUserRepository.js";
import GetUserRepository from "../../infra/database/repositories/user/GetUserRepository.js";
import DeleteUserRepository from "../../infra/database/repositories/user/DeleteUserRepository.js";
import UpdateUserRepository from "../../infra/database/repositories/user/UpdateUserRepository.js";

import User from "../../domain/entities/User.js";

class UserController {
  constructor(
    createUserService,
    updateUserService,
    deleteUserService,
    getUserService
  ) {
    this.createUserService = createUserService;
    this.updateUserService = updateUserService;
    this.deleteUserService = deleteUserService;
    this.getUserService = getUserService;
  }

  get(request, response) {
    const users = this.getUserService.handle();

    return response.writeHead(200).end(
      JSON.stringify({
        users,
        message: "Users listed successfully",
      })
    );
  }

  create({ body }, response) {
    const createdUser = this.createUserService.handle(body);

    return response.writeHead(200).end(
      JSON.stringify({
        user: createdUser,
        message: "Created user successfully",
      })
    );
  }

  update({ body, params }, response) {
    const updatedUser = this.updateUserService.handle(params.id, body);

    return response.writeHead(200).end(
      JSON.stringify({
        user: updatedUser,
        message: "Updated user successfully",
      })
    );
  }

  delete({ params }, response) {
    this.deleteUserService.handle(params.id);

    return response
      .writeHead(200)
      .end(JSON.stringify({ message: "Deleted user successfully" }));
  }
}

export default new UserController(
  new CreateUserService(new UUID(), new CreateUserRepository(ORM), new User()),
  new UpdateUserService(new UpdateUserRepository(ORM)),
  new DeleteUserService(new DeleteUserRepository(ORM)),
  new GetUserService(new GetUserRepository(ORM))
);
