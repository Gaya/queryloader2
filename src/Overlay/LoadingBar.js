function LoadingBar() {
    'use strict';
    this.element = null;
    this.className = "queryloader__overlay__bar";
    this.barHeight = 1;
    this.barColor = "#fff";
}

/**
 * Creates the element for the loadingbar
 */
LoadingBar.prototype.create = function () {
    'use strict';
    this.element = document.createElement("div");
    this.element.setAttribute("class", this.className);
    this.setStyling();
    this.updateProgress(0, 0);
};

LoadingBar.prototype.setStyling = function () {
    'use strict';

    this.element.style.height = this.barHeight + "px";
    this.element.style.marginTop = "-" + (this.barHeight / 2) + "px";
    this.element.style.backgroundColor = this.barColor;
    this.element.style.position = "absolute";
    this.element.style.top = "50%";

    this.setTransitionTime(100);
};

LoadingBar.prototype.updateProgress = function (percentage, time) {
    'use strict';

    if (parseInt(percentage) < 0) {
        percentage = 0;
    } else if (parseInt(percentage) > 100) {
        percentage = 100;
    }

    if (time !== 0) {
        this.setTransitionTime(time);
    }

    this.element.style.width = parseInt(percentage) + "%";
};

LoadingBar.prototype.setTransitionTime = function (ms) {
    "use strict";
    this.element.style.WebkitTransition = "width " + ms + "ms";
    this.element.style.MozTransition = "width " + ms + "ms";
    this.element.style.OTransition = "width " + ms + "ms";
    this.element.style.MsTransition = "width " + ms + "ms";
    this.element.style.Transition = "width " + ms + "ms";
};

module.exports = LoadingBar;