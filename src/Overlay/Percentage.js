function Percentage() {
    'use strict';
    this.element = null;
    this.idName = "qlPercentage";
    this.className = "queryloader__overlay__percentage";
    this.barHeight = 1;
    this.barColor = "#fff";
}

Percentage.prototype.create = function () {
    'use strict';
    this.element = document.createElement("div");
    this.element.setAttribute("class", this.className);
    this.element.setAttribute("id", this.idName);
    this.applyStyling();
    this.updateProgress(0, 0);
};

Percentage.prototype.applyStyling = function () {
    'use strict';
    this.element.style.height = "40px";
    this.element.style.width = "100%";
    this.element.style.position = "absolute";
    this.element.style.fontSize = "3em";
    this.element.style.top = "50%";
    this.element.style.left = "0";
    this.element.style.marginTop = "-" + (59 + this.barHeight) + "px";
    this.element.style.textAlign = "center";
    this.element.style.color = this.barColor;
};

Percentage.prototype.updateProgress = function (percentage, time) {
    'use strict';

    if (parseInt(percentage) < 0) {
        percentage = 0;
    } else if (parseInt(percentage) > 100) {
        percentage = 100;
    }

    this.element.innerHTML = parseInt(percentage) + "%";
};

module.exports = Percentage;