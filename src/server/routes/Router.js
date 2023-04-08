export default class Router {
  #request = undefined;
  #response = undefined;

  setHttpInfo(request, response) {
    this.#request = request;
    this.#response = response;
  }

  #notFoundRouteResponse() {
    return this.#response.writeHead(404).end();
  }

  get(resource, callback) {
    if (this.#request.url === resource && this.#request.method === "GET")
      return callback(this.#request, this.#response);
  }

  post(resource, callback) {
    if (this.#request.url === resource && this.#request.method === "POST")
      return callback(this.#request, this.#response);
  }

  put(resource, callback) {
    if (this.#request.url === resource && this.#request.method === "PUT")
      return callback(this.#request, this.#response);
  }

  delete(resource, callback) {
    if (this.#request.url === resource && this.#request.method === "DELETE")
      return callback(this.#request, this.#response);
  }
}
