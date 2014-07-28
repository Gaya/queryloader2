function LoadingBar() {
    'use strict';
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
};



module.exports = LoadingBar;