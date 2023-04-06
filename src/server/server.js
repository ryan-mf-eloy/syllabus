import http from "node:http";

import setContentTypeMiddleware from "./middleware/setContentTypeMiddleware.js";
import setStreamsWIthResponseMIddleware from "./middleware/setStreamsWIthResponseMIddleware.js";

import { routes } from "./routes.js";

const server = http.createServer(async function httpClientFunction(
  request,
  response
) {
  const { method, url } = request;

  await setContentTypeMiddleware(request, response);

  const foundRoute = routes.find((route) => {
    return !!(route.method === method && route.resource.test(url));
  });

  if (foundRoute) {
    if (foundRoute.method !== "GET") {
      const routeParams = url.match(foundRoute.resource);

      const params = { ...routeParams.groups };

      const fullStreamedBody = await setStreamsWIthResponseMIddleware(
        request,
        response
      );

      return foundRoute.handler(
        { ...request, body: fullStreamedBody, params },
        response
      );
    }

    const routeParams = url.match(foundRoute.resource);
    const query = { ...routeParams.groups };
    request.query = query;

    return foundRoute.handler(request, response);
  }

  return response.writeHead(404).end("Page Not Found");
});

server.listen(3333);
