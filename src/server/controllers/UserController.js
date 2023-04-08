class UserController {
  get(request, response) {
    return response.end();
  }

  create(request, response) {
    return response.writeHead(200).end("Create user successfully");
  }

  update(request, response) {
    return response.writeHead(200).end("Update user successfully");
  }

  delete(request, response) {
    return response.writeHead(200).end("Delete user successfully");
  }
}

export default new UserController();
