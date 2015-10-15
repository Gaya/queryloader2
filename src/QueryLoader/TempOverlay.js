'use strict';
module.exports = function() {
  var timeout = window.setInterval(function() {
    if (typeof document.getElementsByTagName('body')[0] !== 'undefined') {
      var tempOverlay = document.createElement('div');
      tempOverlay.style.position = 'fixed';
      tempOverlay.style.width = '100%';
      tempOverlay.style.height = '100%';
      tempOverlay.style.zIndex = '9999';
      tempOverlay.style.backgroundColor = '#000';
      tempOverlay.style.left = '0';
      tempOverlay.style.top = '0';
      tempOverlay.setAttribute('id', 'qLtempOverlay');
      document.getElementsByTagName('body')[0].appendChild(tempOverlay);

      window.clearInterval(timeout);
    }
  }, 1);
};
