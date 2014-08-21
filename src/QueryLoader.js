var ImagePreloader = require('./ImagePreloader/');
var Overlay = require('./Overlay/');

function QueryLoader(element, options) {
    'use strict';
    this.element = element;
    this.options = options;
    this.done = false;

    //The default options
    this.defaultOptions = {
        onComplete: function() {},
        backgroundColor: "#000",
        barColor: "#fff",
        overlayId: 'qLoverlay',
        barHeight: 1,
        percentage: false,
        deepSearch: true,
        minimumTime: 500,
        maxTime: 10000,
        fadeOutTime: 300
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

    if (typeof this.element !== "undefined") {
        this.createOverlay();
        this.createPreloader();
    }
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
    this.overlay.init();
};

QueryLoader.prototype.createPreloader = function () {
    'use strict';
    this.preloader = new ImagePreloader(this);

    this.preloader.findAndPreload(this.element);
};

QueryLoader.prototype.updateProgress = function (done, total) {
    "use strict";
    this.overlay.updateProgress(((done / total) * 100), this.options.minimumTime);

    if (done === total && this.done === false) {
        this.doneLoading();
    }
};

QueryLoader.prototype.doneLoading = function () {
    "use strict";
    this.overlay.element.style.opacity = 0;
};

module.exports = QueryLoader;