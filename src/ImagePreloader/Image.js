'use strict';
var ImageLoaded = require('./ImageLoaded.js');

var QueryLoaderImage = {
  create: function() {
    this.element = document.createElement('img');
    this.element.setAttribute('src', this.src);
  },

  preload: function(cb) {
    ImageLoaded(this.element, function(err, alreadyLoaded) {
      cb(err, alreadyLoaded);
    });
  },
};

module.exports = function(src) {
  var image = Object.create(QueryLoaderImage);

  image.src = src;
  image.element = null;

  if (typeof src !== 'undefined') {
    image.create();
  }

  return image;
};
