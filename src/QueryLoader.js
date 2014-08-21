var ImagePreloader = require('./ImagePreloader/');
var Overlay = require('./Overlay/');

function QueryLoader(element, options) {
    'use strict';
    this.element = element;
    this.options = options;

    //The default options
    this.defaultOptions = {
        onComplete: function() {},
        onLoadComplete: function() {},
        backgroundColor: "#000",
        barColor: "#fff",
        overlayId: 'qLoverlay',
        barHeight: 1,
        percentage: false,
        deepSearch: true,
        completeAnimation: "fade",
        minimumTime: 500
    };

    //children
    this.overlay = null;
    this.preloader = null;

    if (element !== null) {
        this.init();
    }
}

QueryLoader.prototype.init = function () {
    'use strict';
    this.extend(this.options, this.defaultOptions);

    this.createPreloader();
    this.preloader.findAndPreload(this.element);
};

QueryLoader.prototype.extend = function (base, adding) {
    'use strict';
    if (typeof base === "undefined") {
        base = {};
    }

    for (var property in adding) {
        if (adding.hasOwnProperty(property)) {
            base[property] = adding[property];
        }
    }

    return base;
};

QueryLoader.prototype.createOverlay = function () {
    'use strict';
    this.overlay = new Overlay(this.element);
};

QueryLoader.prototype.createPreloader = function () {
    'use strict';
    this.preloader = new ImagePreloader(this.element);
};

module.exports = QueryLoader;