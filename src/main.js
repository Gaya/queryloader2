var QueryLoader2 = require('./QueryLoader.js');

//jquery and zepto
if (window.jQuery || window.Zepto) {
    (function ($) {
        'use strict';
        $.fn.queryLoader2 = function (params) {
            var s = new QueryLoader2($(this)[0], params);
            return s;
        };
    })(window.jQuery || window.Zepto);
}

// component
if (typeof(module) !== 'undefined')
{
    module.exports = QueryLoader2;
}

// requirejs support
if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return QueryLoader2;
    });
}