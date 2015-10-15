'use strict';
function parsePercentage(percentage) {
  if (parseInt(percentage) < 0) {
    return 0;
  }

  if (parseInt(percentage) > 100) {
    return 100;
  }

  return parseInt(percentage);
}

module.exports = parsePercentage;
