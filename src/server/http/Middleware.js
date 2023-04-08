export default class Middleware {
  setHeaders(response) {
    response.setHeader("Content-Type", "application/json");
  }
  routeParamsInterpreter(resource) {
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
}
