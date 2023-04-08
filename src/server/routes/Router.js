class Router {
  #routes = new Map();
  #request = undefined;
  #response = undefined;

  setHttpInfo(request, response) {
    this.#request = request;
    this.#response = response;
  }

  #routeParamsInterpreter(resource) {
    const routeParams = /:([A-z]+)/g;
    const urlWithRouteParam = resource.replaceAll(
      routeParams,
      "(?<$1>[a-z0-9-_]+)"
    );

    const routeParamRegExp = new RegExp(
      `^${urlWithRouteParam}(?<query>\\?(.*))?$`
    );

    return routeParamRegExp.toString();
  }

  #sendNotFoundRouteResponse() {
    return this.#response.writeHead(404).end();
  }

  #setURLParams(resource) {
    const requestedUrlByHttpClient = this.#request.url;

    const { groups } = requestedUrlByHttpClient.match(resource);

    this.#request.params = { ...groups };
    delete this.#request.params.query;

    if (groups?.query) {
      const splittedQueryParams = groups.query.replace("?", "").split("&");
      const queryParams = splittedQueryParams.reduce((acc, value) => {
        const mapParam = value.split("=");

        return (acc = { [mapParam[0]]: mapParam[1], ...acc });
      }, {});

      this.#request.query = queryParams;
    }
  }

  get(resource, handler) {
    this.#routes.set(
      JSON.stringify({
        resource: this.#routeParamsInterpreter(resource),
        method: "GET",
      }),
      { handler }
    );
  }

  post(resource, handler) {
    this.#routes.set(
      JSON.stringify({
        resource: this.#routeParamsInterpreter(resource),
        method: "POST",
      }),
      { handler }
    );
  }

  put(resource, handler) {
    this.#routes.set(
      JSON.stringify({
        resource: this.#routeParamsInterpreter(resource),
        method: "PUT",
      }),
      { handler }
    );
  }

  delete(resource, handler) {
    this.#routes.set(
      JSON.stringify({
        resource: this.#routeParamsInterpreter(resource),
        method: "DELETE",
      }),
      { handler }
    );
  }

  #clearRegExp(routeData) {
    return new RegExp(routeData.slice(1, 45));
  }

  #verifyIfRouteHasParameters(route) {
    const routeData = JSON.parse(route[0]);

    const formattedRouteResourceRegExp = new RegExp(
      this.#clearRegExp(routeData.resource)
    );

    const isValidURLParams = formattedRouteResourceRegExp.test(
      this.#request.url
    );

    const isSameHttpClientRequestMethod =
      routeData.method === this.#request.method;

    return isValidURLParams && isSameHttpClientRequestMethod;
  }

  redirect() {
    const routesArray = Array.from(this.#routes);
    const foundRoute = routesArray.filter((route) =>
      this.#verifyIfRouteHasParameters(route)
    );

    const filteredRoute = foundRoute[0];

    if (filteredRoute) {
      const filteredRouteResource = this.#clearRegExp(
        JSON.parse(filteredRoute[0]).resource
      );
      this.#setURLParams(filteredRouteResource);
    }

    const urlWithParameters = !filteredRoute
      ? undefined
      : JSON.parse(filteredRoute[0])?.resource;

    const urlWithoutParameters = this.#routeParamsInterpreter(
      this.#request.url
    );

    const requestedRouteByHttpClient = this.#routes.get(
      JSON.stringify({
        resource: urlWithParameters || urlWithoutParameters,
        method: this.#request.method,
      })
    );

    if (requestedRouteByHttpClient)
      return requestedRouteByHttpClient.handler(this.#request, this.#response);

    return this.#sendNotFoundRouteResponse();
  }
}

export default new Router();
