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

    return routeParamRegExp;
  }

  #sendNotFoundResponse() {
    return this.#response.writeHead(404).end();
  }

  #setURLParams(resource) {
    const requestedUrlByHttpClient = this.#request.url;

    const { groups } = requestedUrlByHttpClient.match(resource);

    this.#request.params = { ...groups };

    if (groups?.query) {
      const splittedQueryParams = groups.query.replace("?", "").split("&");
      const queryParams = splittedQueryParams.reduce((acc, value) => {
        const mapParam = value.split("=");

        return (acc = { [mapParam[0]]: mapParam[1], ...acc });
      }, {});

      this.#request.params.query = queryParams;
    }
  }

  get(resource, handler) {
    this.#routes.set(
      JSON.stringify({
        resource: resource,
        method: "GET",
      }),
      { handler }
    );
  }

  post(resource, handler) {
    this.#routes.set(
      JSON.stringify({
        resource: resource,
        method: "POST",
      }),
      { handler }
    );
  }

  put(resource, handler) {
    this.#routes.set(
      JSON.stringify({
        resource: resource,
        method: "PUT",
      }),
      { handler }
    );
  }

  patch(resource, handler) {
    this.#routes.set(
      JSON.stringify({
        resource: resource,
        method: "PATCH",
      }),
      { handler }
    );
  }

  delete(resource, handler) {
    this.#routes.set(
      JSON.stringify({
        resource: resource,
        method: "DELETE",
      }),
      { handler }
    );
  }

  redirect() {
    const routes = Array.from(this.#routes);
    let notExistRoute = true;

    for (const route of routes) {
      const routeData = JSON.parse(route[0]);
      const routeCallback = route[1];

      const requestedUrl = this.#request.url;
      const requestedMethod = this.#request.method;

      const routeWithParamsValidator = this.#routeParamsInterpreter(
        routeData.resource
      );
      const urlHasParams = routeWithParamsValidator.test(requestedUrl);

      const resource = requestedUrl.match(/\/(.*?)\//);
      const resourceEndWithBar =
        resource &&
        routeData.resource !== "/" &&
        requestedUrl.startsWith(routeData.resource);

      const isSameMethodOfRoute = requestedMethod === routeData.method;
      const isSameRouteOfRequest =
        requestedUrl === routeData.resource || resourceEndWithBar;

      if (urlHasParams) {
        this.#setURLParams(routeWithParamsValidator);

        if (isSameMethodOfRoute) {
          notExistRoute = false;
          routeCallback.handler(this.#request, this.#response);
          break;
        }
      }

      if (isSameMethodOfRoute && isSameRouteOfRequest) {
        notExistRoute = false;
        routeCallback.handler(this.#request, this.#response);
        break;
      }
    }

    if (notExistRoute) return this.#sendNotFoundResponse();
  }
}

export default new Router();
