var ImagePreloader = require('./ImagePreloader/');
var Overlay = require('./Overlay/');

function QueryLoader(element, options) {
    'use strict';
    this.element = element;
    this.options = options;
    this.done = false;
    this.maxTimeout = null;

    //The default options
    this.defaultOptions = {
        onComplete: function() {},
        onProgress: function() {},
        backgroundColor: "#000",
        barColor: "#fff",
        overlayId: 'qLoverlay',
        percentageId: 'qLpercentage',
        barHeight: 1,
        percentage: false,
        deepSearch: true,
        minimumTime: 300,
        maxTime: 10000,
        fadeOutTime: 1000
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
    this.options = this.extend(this.defaultOptions, this.options);

    if (typeof this.element !== "undefined") {
        this.createOverlay();
        this.removeTempOverlay();
        this.createPreloader();
        this.startMaxTimeout();
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

QueryLoader.prototype.startMaxTimeout = function () {
    "use strict";
    this.maxTimeout = window.setTimeout(this.doneLoading.bind(this), this.options.maxTime);
};

QueryLoader.prototype.createOverlay = function () {
    'use strict';
    this.overlay = new Overlay(this.element);
    this.overlay.idName = this.options.overlayId;
    this.overlay.percentageId = this.options.percentageId;
    this.overlay.backgroundColor = this.options.backgroundColor;
    this.overlay.barHeight = this.options.barHeight;
    this.overlay.barColor = this.options.barColor;
    this.overlay.showPercentage = this.options.percentage;
    this.overlay.fadeOutTime = this.options.fadeOutTime;

    if (typeof this.element !== "undefined") {
        this.overlay.init();
    }
};

QueryLoader.prototype.removeTempOverlay = function () {
    window.setTimeout(function () {
        var tempOverlay = document.getElementById("qLtempOverlay");
        if (tempOverlay) {
            tempOverlay.parentNode.removeChild(tempOverlay);
        }
    }, 0);
};

QueryLoader.createTempOverlay = function () {
    var timeout = window.setInterval(function() {
        if (typeof document.getElementsByTagName('body')[0] !== "undefined") {
            var tempOverlay = document.createElement("div");
            tempOverlay.style.position = "fixed";
            tempOverlay.style.width = "100%";
            tempOverlay.style.height = "100%";
            tempOverlay.style.zIndex = "9999";
            tempOverlay.style.backgroundColor = "#000";
            tempOverlay.style.left = "0";
            tempOverlay.style.top = "0";
            tempOverlay.setAttribute("id", "qLtempOverlay");
            document.getElementsByTagName('body')[0].appendChild(tempOverlay);

            window.clearInterval(timeout);
        }
    }, 1);
};

QueryLoader.prototype.createPreloader = function () {
    'use strict';
    this.preloader = new ImagePreloader(this);
    this.preloader.deepSearch = this.options.deepSearch;

    window.setTimeout(function () { this.preloader.findAndPreload(this.element); }.bind(this), 100);
};

QueryLoader.prototype.updateProgress = function (done, total) {
    "use strict";
    var percentage = ((done / total) * 100);
    this.overlay.updateProgress(percentage, this.options.minimumTime);

    if (typeof this.options.onProgress === "function") {
        this.options.onProgress(percentage, done, total);
    }

    if (done === total && this.done === false) {
        window.clearTimeout(this.maxTimeout);
        window.setTimeout(this.doneLoading.bind(this), this.options.minimumTime);
    }
};

QueryLoader.prototype.doneLoading = function () {
    "use strict";
    window.clearTimeout(this.maxTimeout);
    this.done = true;

    this.overlay.element.style.opacity = 0;

    window.setTimeout(this.destroy.bind(this), this.options.fadeOutTime);
};

QueryLoader.prototype.destroy = function () {
    "use strict";
    this.overlay.remove();

    this.options.onComplete();
};

module.exports = QueryLoader;