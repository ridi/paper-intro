function getLocationType(location) {
  const match = /^\/(accessories|stockists)\/(?:ridipaper|paper-pro)\/?$/.exec(location.pathname);
  if (match != null) {
    return match[1];
  }
  return '';
}

function shouldUpdateScroll({ prevRouterProps, routerProps }) {
  const prevLocationType = getLocationType(prevRouterProps.location);
  const currLocationType = getLocationType(routerProps.location);
  if (prevLocationType === '') {
    return true;
  }
  return prevLocationType !== currLocationType;
}

module.exports = {
  shouldUpdateScroll,
};
