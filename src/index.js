require('./Polyfills');
var QueryLoader2 = require('./QueryLoader');
var TempOverlay = require('./QueryLoader/TempOverlay');

//jquery and zepto
if (window.jQuery || window.Zepto) {
  (function($) {
    'use strict';
    $.fn.queryLoader2 = function(options) {
      return this.each(function() {
        (QueryLoader2(this, options));
      });
    };
  })(window.jQuery || window.Zepto);
}

// component
if (typeof module !== 'undefined') {
  module.exports = QueryLoader2;
}

// requirejs support
if (typeof define === 'function' && define.amd) {
  define([], function() {
    'use strict';
    return QueryLoader2;
  });
}

window.QueryLoader2 = QueryLoader2;
TempOverlay();
