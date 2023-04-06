export default async function setContentTypeMiddleware(request, response) {
  response.setHeader("Content-Type", "application/json");
}
