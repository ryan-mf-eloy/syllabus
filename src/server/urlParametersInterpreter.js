export default function urlParametersInterpreter(endpoint) {
  const routeParams = /:([A-z]+)/g;
  const endpointWithRouteParam = endpoint.replaceAll(
    routeParams,
    "(?<$1>[a-z0-9-_]+)"
  );

  const routeParamRegExp = new RegExp(
    `^${endpointWithRouteParam}(?<query>\\?(.*))?$`
  );
  return routeParamRegExp;
}
