class UserController {
  get(request, response) {
    return response.end(
      JSON.stringify([
        {
          users: [
            {
              name: "John",
            },
            {
              name: "Bob",
            },
          ],
        },
      ])
    );
  }
}

export default new UserController();
