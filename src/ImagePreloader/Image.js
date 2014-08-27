var ImageLoaded = require('./ImageLoaded.js');

function Image(src) {
    'use strict';
    this.src = src;
    this.element = null;

    if (typeof src !== "undefined") {
        this.create();
    }
}

Image.prototype.create = function () {
    'use strict';
    this.element = document.createElement("img");
    this.element.setAttribute("src", this.src);
};

Image.prototype.preload = function (cb) {
    'use strict';
    ImageLoaded(this.element, function(err, alreadyLoaded) {
        cb(err, alreadyLoaded);
    });
};

module.exports = Image;