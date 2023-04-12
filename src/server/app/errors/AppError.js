class AppError {
  #responseController = {};

  constructor() {}

  setHttpResponseController(responseController) {
    this.#responseController = responseController;
  }

  handle(message, httpStatusCode) {
    this.#responseController.writeHead(httpStatusCode).end(
      JSON.stringify({
        message: message,
      })
    );
  }
}

export default new AppError();
