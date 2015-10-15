'use strict';
var PercentageParser = require('./PercentageParser');

var LoadingBar = {
  /**
   * Creates the element for the loading bar
   */
  create: function() {
    this.element = document.createElement('div');
    this.element.setAttribute('class', this.className);
    this.setStyling();
    this.updateProgress(0, 0);
  },

  setStyling: function() {
    this.element.style.height = this.barHeight + 'px';
    this.element.style.marginTop = '-' + (this.barHeight / 2) + 'px';
    this.element.style.backgroundColor = this.barColor;
    this.element.style.position = 'absolute';
    this.element.style.top = '50%';

    this.setTransitionTime(100);
  },

  updateProgress: function(percentage, time) {
    if (time !== 0) {
      this.setTransitionTime(time);
    }

    percentage = PercentageParser(percentage);

    this.element.style.width = percentage + '%';
  },

  setTransitionTime: function(ms) {
    this.element.style.WebkitTransition = 'width ' + ms + 'ms';
    this.element.style.MozTransition = 'width ' + ms + 'ms';
    this.element.style.OTransition = 'width ' + ms + 'ms';
    this.element.style.MsTransition = 'width ' + ms + 'ms';
    this.element.style.Transition = 'width ' + ms + 'ms';
  },
};

module.exports = function() {
  var loadingBar = Object.create(LoadingBar);

  loadingBar.element = null;
  loadingBar.className = 'queryloader__overlay__bar';
  loadingBar.barHeight = 1;
  loadingBar.barColor = '#fff';

  return loadingBar;
};
