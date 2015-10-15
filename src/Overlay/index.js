'use strict';
var LoadingBar = require('./LoadingBar');
var Percentage = require('./Percentage');

var Overlay = {
  init: function() {
    this.create();

    this.loadingBar = LoadingBar();
    this.loadingBar.barHeight = this.barHeight;
    this.loadingBar.barColor = this.barColor;
    this.loadingBar.create();
    this.element.appendChild(this.loadingBar.element);

    if (this.showPercentage) {
      this.percentage = Percentage();
      this.percentage.barColor = this.barColor;
      this.percentage.idName = this.percentageId;
      this.percentage.create();
      this.element.appendChild(this.percentage.element);
    }

    this.parentElement.appendChild(this.element);
  },

  create: function() {
    this.element = (document.querySelector('#' + this.idName) || document.createElement('div'));
    this.element.setAttribute('class', this.className);
    this.element.setAttribute('id', this.idName);
    this.applyStyling();
  },

  applyStyling: function() {
    //determine postion of overlay and set parent position
    this.element.style.position = this.calculatePosition();
    this.element.style.width = '100%';
    this.element.style.height = '100%';
    this.element.style.backgroundColor = this.backgroundColor;
    this.element.style.backgroundPosition = 'fixed';
    this.element.style.zIndex = 666999; //very HIGH
    this.element.style.top = '0';
    this.element.style.left = '0';

    this.element.style.WebkitTransition = 'opacity ' + this.fadeOutTime + 'ms';
    this.element.style.MozTransition = 'opacity ' + this.fadeOutTime + 'ms';
    this.element.style.OTransition = 'opacity ' + this.fadeOutTime + 'ms';
    this.element.style.MsTransition = 'opacity ' + this.fadeOutTime + 'ms';
    this.element.style.Transition = 'opacity ' + this.fadeOutTime + 'ms';
  },

  calculatePosition: function() {
    var overlayPosition = 'absolute';

    if (this.parentElement.tagName.toLowerCase() === 'body') {
      overlayPosition = 'fixed';
    } else {
      if (this.parentElement.style.position !== 'fixed' || this.parentElement.style.position !== 'absolute') {
        this.parentElement.style.position = 'relative';
      }
    }

    return overlayPosition;
  },

  updateProgress: function(percentage, time) {
    if (this.loadingBar !== null) {
      this.loadingBar.updateProgress(percentage, time);
    }

    if (this.percentage !== null) {
      this.percentage.updateProgress(percentage, time);
    }
  },

  remove: function() {
    if (this.canRemove(this.element)) {
      this.element.parentNode.removeChild(this.element);
    }
  },

  canRemove: function(element) {
    return (element.parentNode && typeof element.parentNode.removeChild !== 'undefined');
  },
};

module.exports = function(parentElement) {
  var overlay = Object.create(Overlay);

  overlay.parentElement = parentElement;
  overlay.idName = 'qLoverlay';
  overlay.percentageId = 'qlPercentage';
  overlay.className = 'queryloader__overlay';
  overlay.element = null;
  overlay.loadingBar = null;
  overlay.percentage = null;
  overlay.barColor = '#ff0000';
  overlay.backgroundColor = '#000';
  overlay.barHeight = 1;
  overlay.fadeOutTime = 300;
  overlay.showPercentage = false;

  return overlay;
};
