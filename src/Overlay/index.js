var LoadingBar = require('./LoadingBar.js');
var Percentage = require('./Percentage.js');

function Overlay(parentElement) {
    'use strict';
    this.parentElement = parentElement;
    this.idName = "qLoverlay";
    this.percentageId = "qlPercentage";
    this.className = "queryloader__overlay";
    this.element = null;
    this.loadingBar = null;
    this.percentage = null;
    this.barColor = "#ff0000";
    this.backgroundColor = "#000";
    this.barHeight = 1;
    this.fadeOutTime = 300;
    this.showPercentage = false;
}

Overlay.prototype.init = function () {
    "use strict";
    this.create();

    this.loadingBar = new LoadingBar();
    this.loadingBar.barHeight = this.barHeight;
    this.loadingBar.barColor = this.barColor;
    this.loadingBar.create();
    this.element.appendChild(this.loadingBar.element);

    if (this.showPercentage) {
        this.percentage = new Percentage();
        this.percentage.barColor = this.barColor;
        this.percentage.idName = this.percentageId;
        this.percentage.create();
        this.element.appendChild(this.percentage.element);
    }

    this.parentElement.appendChild(this.element);
};

Overlay.prototype.create = function () {
    'use strict';
    this.element = (document.querySelector("#" + this.idName) || document.createElement("div"));
    this.element.setAttribute("class", this.className);
    this.element.setAttribute("id", this.idName);
    this.applyStyling();
};

Overlay.prototype.applyStyling = function () {
    'use strict';
    //determine postion of overlay and set parent position
    this.element.style.position = this.calculatePosition();
    this.element.style.width = "100%";
    this.element.style.height = "100%";
    this.element.style.backgroundColor = this.backgroundColor;
    this.element.style.backgroundPosition = "fixed";
    this.element.style.zIndex = 666999; //very HIGH
    this.element.style.top = "0";
    this.element.style.left = "0";

    this.element.style.WebkitTransition = "opacity " + this.fadeOutTime + "ms";
    this.element.style.MozTransition = "opacity " + this.fadeOutTime + "ms";
    this.element.style.OTransition = "opacity " + this.fadeOutTime + "ms";
    this.element.style.MsTransition = "opacity " + this.fadeOutTime + "ms";
    this.element.style.Transition = "opacity " + this.fadeOutTime + "ms";
};

Overlay.prototype.calculatePosition = function () {
    'use strict';
    var overlayPosition = "absolute";

    if (this.parentElement.tagName.toLowerCase() === "body") {
        overlayPosition = "fixed";
    } else {
        if (this.parentElement.style.position !== "fixed" || this.parentElement.style.position !== "absolute" ) {
            this.parentElement.style.position = "relative";
        }
    }

    return overlayPosition;
};

Overlay.prototype.updateProgress = function (percentage, time) {
    "use strict";
    if (this.loadingBar !== null) {
        this.loadingBar.updateProgress(percentage, time);
    }

    if (this.percentage !== null) {
        this.percentage.updateProgress(percentage, time);
    }
};

Overlay.prototype.remove = function () {
    "use strict";
    this.element.parentNode.removeChild(this.element);
};

module.exports = Overlay;