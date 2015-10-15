'use strict';
var ImagePreloader = require('./../ImagePreloader');
var Overlay = require('./../Overlay');

var QueryLoader = {
  init: function(options, defaultOptions) {
    this.options = this.extend(defaultOptions, options);

    if (typeof this.element !== 'undefined') {
      this.createOverlay();
      this.removeTempOverlay();
      this.createPreloader();
      this.startMaxTimeout();
    }
  },

  extend: function(base, adding) {
    if (typeof base === 'undefined') {
      base = {};
    }

    for (var property in adding) {
      if (adding.hasOwnProperty(property)) {
        base[property] = adding[property];
      }
    }

    return base;
  },

  startMaxTimeout: function() {
    this.maxTimeout = window.setTimeout(this.doneLoading.bind(this), this.options.maxTime);
  },

  createOverlay: function() {
    this.overlay = Overlay(this.element);
    this.overlay.idName = this.options.overlayId;
    this.overlay.percentageId = this.options.percentageId;
    this.overlay.backgroundColor = this.options.backgroundColor;
    this.overlay.barHeight = this.options.barHeight;
    this.overlay.barColor = this.options.barColor;
    this.overlay.showPercentage = this.options.percentage;
    this.overlay.fadeOutTime = this.options.fadeOutTime;

    if (typeof this.element !== 'undefined') {
      this.overlay.init();
    }
  },

  removeTempOverlay: function() {
    window.setTimeout(function() {
      var tempOverlay = document.getElementById('qLtempOverlay');
      if (tempOverlay && tempOverlay.parentNode) {
        tempOverlay.parentNode.removeChild(tempOverlay);
      }
    }, 0);
  },

  createPreloader: function() {
    this.preloader = ImagePreloader(this);
    this.preloader.deepSearch = this.options.deepSearch;

    window.setTimeout(function() {
      this.preloader.findAndPreload(this.element);
    }.bind(this), 100);
  },

  updateProgress: function(done, total) {
    var percentage = ((done / total) * 100);
    this.overlay.updateProgress(percentage, this.options.minimumTime);

    if (typeof this.options.onProgress === 'function') {
      this.options.onProgress(percentage, done, total);
    }

    if (done === total && this.done === false) {
      window.clearTimeout(this.maxTimeout);
      window.setTimeout(this.doneLoading.bind(this), this.options.minimumTime);
    }
  },

  doneLoading: function() {
    window.clearTimeout(this.maxTimeout);
    this.done = true;

    this.overlay.element.style.opacity = 0;

    window.setTimeout(this.destroy.bind(this), this.options.fadeOutTime);
  },

  destroy: function() {
    this.overlay.remove();

    this.options.onComplete();
  },
};

module.exports = function(element, options) {
  var queryLoader = Object.create(QueryLoader);

  queryLoader.element = element;
  queryLoader.options = {};
  queryLoader.done = false;
  queryLoader.maxTimeout = null;

  //children
  queryLoader.overlay = null;
  queryLoader.preloader = null;

  if (element !== null) {
    var voidFunc = function() {};

    queryLoader.init(options, {
      onComplete: voidFunc,
      onProgress: voidFunc,
      backgroundColor: '#000',
      barColor: '#fff',
      overlayId: 'qLoverlay',
      percentageId: 'qLpercentage',
      barHeight: 1,
      percentage: false,
      deepSearch: true,
      minimumTime: 300,
      maxTime: 10000,
      fadeOutTime: 1000,
    });
  }

  return queryLoader;
};
