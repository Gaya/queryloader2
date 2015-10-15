'use strict';
var PercentageParser = require('./PercentageParser');

var Percentage = {
  create: function() {
    this.element = document.createElement('div');
    this.element.setAttribute('class', this.className);
    this.element.setAttribute('id', this.idName);
    this.applyStyling();
    this.updateProgress(0, 0);
  },

  applyStyling: function() {
    this.element.style.height = '40px';
    this.element.style.width = '100%';
    this.element.style.position = 'absolute';
    this.element.style.fontSize = '3em';
    this.element.style.top = '50%';
    this.element.style.left = '0';
    this.element.style.marginTop = '-' + (59 + this.barHeight) + 'px';
    this.element.style.textAlign = 'center';
    this.element.style.color = this.barColor;
  },

  updateProgress: function(percentage, time) {
    percentage = PercentageParser(percentage);

    this.element.innerHTML = percentage + '%';
  },
};

module.exports = function() {
  var percentage = Object.create(Percentage);

  percentage.element = null;
  percentage.idName = 'qlPercentage';
  percentage.className = 'queryloader__overlay__percentage';
  percentage.barHeight = 1;
  percentage.barColor = '#fff';

  return percentage;
};
