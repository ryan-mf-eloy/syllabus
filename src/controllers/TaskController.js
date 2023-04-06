export default class TaskController {
  get(request, response) {
    return response.end(
      JSON.stringify([
        {
          tasks: [],
        },
      ])
    );
  }
}
