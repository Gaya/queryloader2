'use strict';
var QueryLoaderImage = require('./Image.js');

var ImagePreloader = {
  getImageSrcs: function(element) {
    this.sources = [];

    if (typeof element !== 'undefined') {
      this.findImageInElement(element);

      if (this.deepSearch === true) {
        var elements = element.querySelectorAll('*');
        for (var i = 0; i < elements.length; i++) {
          if (elements[i].tagName !== 'SCRIPT') {
            this.findImageInElement(elements[i]);
          }
        }
      }
    }

    return this.sources;
  },

  findAndPreload: function(element) {
    if (typeof element === 'undefined') {
      return;
    }

    this.sources = this.getImageSrcs(element);

    for (var i = 0; i < this.sources.length; i++) {
      var image = QueryLoaderImage(this.sources[i]);
      image.preload(this.imageLoaded.bind(this));
      this.images.push(image);
    }
  },

  imageLoaded: function() {
    this.loaded++;

    this.updateProgress();
  },

  updateProgress: function() {
    this.parent.updateProgress(this.loaded, this.sources.length);
  },

  findImageInElement: function(element) {
    var urlType = this.determineUrlAndType(element);

    //skip if gradient
    if (!this.hasGradient(urlType.url)) {
      //remove unwanted chars
      urlType.url = this.stripUrl(urlType.url);

      //split urls
      var urls = urlType.url.split(', ');

      for (var i = 0; i < urls.length; i++) {
        if (this.validUrl(urls[i]) && this.urlIsNew(urls[i])) {
          var extra = '';

          if (this.isIE() || this.isOpera()) {
            //filthy always no cache for IE, sorry peeps!
            extra = '?rand=' + Math.random();
          }

          //add image to found list
          this.sources.push(urls[i] + extra);
        }
      }
    }
  },

  determineUrlAndType: function(element) {
    var url = '';
    var type = 'normal';
    var style = element.currentStyle || window.getComputedStyle(element, null);

    if ((typeof style.backgroundImage !== 'undefined' && style.backgroundImage !== '' && style.backgroundImage !== 'none')
      || (typeof element.style.backgroundImage !== 'undefined' && element.style.backgroundImage !== '' && element.style.backgroundImage !== 'none')
    ) {
      //if object has background image
      url = (style.backgroundImage || element.style.backgroundImage);
      type = 'background';
    } else if (typeof element.getAttribute('src') !== 'undefined' && element.nodeName.toLowerCase() === 'img') {
      //if is img and has src
      url = element.getAttribute('src');
    }

    return {
      url: url,
      type: type,
    };
  },

  hasGradient: function(url) {
    return (url && typeof url.indexOf !== 'undefined' ? url.indexOf('gradient(') !== -1 : false);
  },

  stripUrl: function(url) {
    url = url.replace(/url\(\'/g, '');
    url = url.replace(/url\(/g, '');
    url = url.replace(/\'\)/g, '');
    url = url.replace(/\)/g, '');

    return url;
  },

  validUrl: function(url) {
    if (url.length > 0 && !url.match(/^(data:)/i)) {
      return true;
    } else {
      return false;
    }
  },

  urlIsNew: function(url) {
    return this.sources.indexOf(url) === -1;
  },

  isIE: function() {
    return navigator.userAgent.match(/msie/i);
  },

  isOpera: function() {
    return navigator.userAgent.match(/Opera/i);
  },
};

module.exports = function(parent) {
  var imagePreloader = Object.create(ImagePreloader);

  imagePreloader.parent = parent;
  imagePreloader.sources = [];
  imagePreloader.images = [];
  imagePreloader.loaded = 0;
  imagePreloader.deepSearch = true;

  return imagePreloader;
};
