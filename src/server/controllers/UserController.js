import DatabaseORM from "../../infra/database/DatabaseORM.js";

import GetAllUsersService from "../../services/GetAllUsersService.js";
import CreateUserService from "../../services/CreateUserService.js";
import UpdateUserService from "../../services/UpdateUserService.js";
import DeleteUserService from "../../services/DeleteUserService.js";

import GetAllUsersRepository from "../../infra/database/repositories/GetAllUsersRepository.js";
import CreateUserRepository from "../../infra/database/repositories/CreateUserRepository.js";
import UpdateUserRepository from "../../infra/database/repositories/UpdateUserRepository.js";
import DeleteUserRepository from "../../infra/database/repositories/DeleteUserRepository.js";

import User from "../../domain/entities/User.js";

import UUID from "../../shared/libs/uuidAdapter.js";

class UserController {
  constructor(
    getAllUsersService,
    createUserService,
    updateUserService,
    deleteUserService
  ) {
    this.getAllUsersService = getAllUsersService;
    this.createUserService = createUserService;
    this.updateUserService = updateUserService;
    this.deleteUserService = deleteUserService;
  }

  #sendResponse(response, statusCode, data, message) {
    return response.writeHead(statusCode).end(
      JSON.stringify({
        data,
        message,
      })
    );
  }

  getAll(request, response) {
    try {
      const allUsers = this.getAllUsersService.handle();

      return this.#sendResponse(
        response,
        200,
        allUsers,
        "Users listed successfully"
      );
    } catch (error) {
      return this.#sendResponse(response, 500, {}, `Error: ${error}`);
    }
  }

  create(request, response) {
    try {
      const createdUser = this.createUserService.handle(request.body);

      if (createdUser.error)
        return this.#sendResponse(response, 400, null, createdUser.error);

      return this.#sendResponse(
        response,
        200,
        createdUser,
        "User created successfully"
      );
    } catch (error) {
      return this.#sendResponse(response, 500, {}, `${error}`);
    }
  }

  update({ params, body }, response) {
    try {
      const updatedUser = this.updateUserService.handle(params.id, body);

      return this.#sendResponse(
        response,
        200,
        updatedUser,
        "User updated successfully"
      );
    } catch (error) {
      return this.#sendResponse(response, 500, {}, `${error}`);
    }
  }

  delete({ params }, response) {
    try {
      this.deleteUserService.handle(params.id);

      return this.#sendResponse(response, 200, {}, "User removed successfully");
    } catch (error) {
      return this.#sendResponse(response, 500, {}, `${error}`);
    }
  }
}

export default new UserController(
  new GetAllUsersService(new GetAllUsersRepository(DatabaseORM)),
  new CreateUserService(
    new UUID(),
    new CreateUserRepository(DatabaseORM),
    new User()
  ),
  new UpdateUserService(new UpdateUserRepository(DatabaseORM)),
  new DeleteUserService(new DeleteUserRepository(DatabaseORM))
);
