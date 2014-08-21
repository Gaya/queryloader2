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
    this.images = [];
};

module.exports = ImagePreloader;