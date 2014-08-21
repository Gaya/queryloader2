var Image = require('./Image.js');

function ImagePreloader() {
    "use strict";
    this.deepSearch = true;
}

ImagePreloader.prototype.getImages = function (element) {
    "use strict";
    this.images = [];
    this.findImageInElement(element);

    if (this.deepSearch === true) {
        var elements = element.querySelectorAll("*");
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].tagName !== "SCRIPT") {
                this.findImageInElement(elements[i]);
            }
        }
    }
};

ImagePreloader.prototype.findImageInElement = function (element) {
    "use strict";
    var url = "";
    var type = "normal";

    if (element.style.backgroundImage !== "") {
        //if object has background image
        url = element.style.backgroundImage;
        type = "background";
    } else if (typeof(element.getAttribute("src")) !== "undefined" && element.nodeName.toLowerCase() === "img") {
        //if is img and has src
        url = element.getAttribute("src");
    }
};

ImagePreloader.prototype.hasGradient = function (url) {
    "use strict";
    return url.indexOf("gradient") !== -1;
};

ImagePreloader.prototype.stripUrl = function (url) {
    "use strict";
    url = url.replace(/url\(\"/g, "");
    url = url.replace(/url\(/g, "");
    url = url.replace(/\"\)/g, "");
    url = url.replace(/\)/g, "");

    return url;
};

module.exports = ImagePreloader;