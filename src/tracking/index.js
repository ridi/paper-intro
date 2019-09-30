import isMobile from 'ismobilejs';

const DeviceType = isMobile(window.navigator.userAgent);
const getUserId = () => 'unknown';
const getDeviceType = () => (DeviceType.phone ? 'mobile' : DeviceType.tablet ? 'tablet' : 'pc');

window.dataLayer = [
  {
    userId: getUserId(),
    deviceType: getDeviceType(),
  },
];

(() => {
  const GtmId = 'GTM-5KJCZ3Q';
  const DataLayerKey = 'dataLayer';

  window[DataLayerKey] = window[DataLayerKey] || [];
  window[DataLayerKey].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

  const GtmScript = document.createElement('script');
  GtmScript.async = true;
  GtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${GtmId}`;

  const firstScriptNode = document.getElementsByTagName('script')[0];
  firstScriptNode.parentNode.insertBefore(GtmScript, firstScriptNode);
})();
