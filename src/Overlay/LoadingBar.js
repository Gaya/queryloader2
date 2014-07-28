function LoadingBar(base) {
    'use strict';
    this.base = base;
    this.element = null;
    this.className = "querloader__overlay__bar";
}

/**
 * Creates the element for the loadingbar
 */
LoadingBar.prototype.create = function () {
    'use strict';
    this.element = document.createElement("div");
    this.element.setAttribute("class", this.className);
    this.setStyling();
};

LoadingBar.prototype.setStyling = function () {
    'use strict';

    //options from QueryLoader
    if (typeof this.base !== "undefined") {
        this.element.style.height = this.base.options.barHeight + "px";
        this.element.style.marginTop = "-" + (this.base.options.barHeight / 2) + "px";
        this.element.style.backgroundColor = this.base.options.barColor;
    }

    this.element.style.position = "absolute";
    this.element.style.top = "50%";

    this.updateProgress(0, 0);
};

LoadingBar.prototype.updateProgress = function (percentage, time) {
    'use strict';

    if (parseInt(percentage) < 0) {
        percentage = 0;
    } else if (parseInt(percentage) > 100) {
        percentage = 100;
    }

    if (time === 0) {
        this.element.style.width = parseInt(percentage) + "%";
    }
};

module.exports = LoadingBar;