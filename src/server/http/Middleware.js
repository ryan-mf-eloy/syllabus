export default class Middleware {
  setHeaders(response) {
    response.setHeader("Content-Type", "application/json");
  }
}
