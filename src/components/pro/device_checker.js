class DeviceChecker {
  static isIE10() {
    return document.documentMode === 10;
  }

  static isIE11() {
    return document.documentMode === 11;
  }

  static isEdge() {
    return window.navigator.userAgent.indexOf('Edge') > -1;
  }

  static isAnd4() {
    const userAgent = navigator.userAgent.toLowerCase();
    const check = userAgent.match(/android\s([4\.]*)/);
    return check ? check[1] : false;
  }

  static isAnd3() {
    const userAgent = navigator.userAgent.toLowerCase();
    const check = userAgent.match(/android\s([3\.]*)/);
    return check ? check[1] : false;
  }

  static isAndLT2() {
    const userAgent = navigator.userAgent.toLowerCase();
    const check = userAgent.match(/android\s([0-2\.]*)/);
    return check ? check[1] : false;
  }
}

export default DeviceChecker;
