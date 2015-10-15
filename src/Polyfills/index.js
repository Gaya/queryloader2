if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    'use strict';
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs = Array.prototype.slice.call(arguments, 1);
    var _this = this;
    var FNOP = function() {};

    var fBound = function() {
        return _this.apply(this instanceof FNOP && oThis
            ? this
            : oThis,
          aArgs.concat(Array.prototype.slice.call(arguments)));
      };

    FNOP.prototype = this.prototype;
    fBound.prototype = new FNOP();

    return fBound;
  };
}