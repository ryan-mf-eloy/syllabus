export default class UserController {
  get(request, response) {
    return response.end(
      JSON.stringify([
        {
          users: [],
        },
      ])
    );
  }
}
