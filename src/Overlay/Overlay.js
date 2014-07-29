var LoadingBar = require('./LoadingBar.js');
var Percentage = require('./Percentage.js');

function Overlay(parentElement) {
    'use strict';
    this.parentElement = parentElement;
    this.className = "queryloader__overlay";
    this.element = null;
    this.loadingBar = null;
    this.percentage = null;
    this.backgroundColor = "#000";
}

Overlay.prototype.create = function () {
    'use strict';
    this.element = document.createElement("div");
    this.element.setAttribute("class", this.className);
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

module.exports = Overlay;