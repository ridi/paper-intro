function getLocationType(location) {
  if (location.pathname.startsWith('/accessories/ridipaper') || location.pathname.startsWith('/accessories/paper-pro')) {
    return 'accessory-index';
  }
  if (location.pathname.startsWith('/stockists/ridipaper') || location.pathname.startsWith('/stockists/paper-pro')) {
    return 'stockists-index';
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
