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

    return this.images;
};

ImagePreloader.prototype.findImageInElement = function (element) {
    "use strict";
    var urlType = this.determineUrlAndType(element);

    //skip if gradient
    if (!this.hasGradient(urlType.url)) {
        //remove unwanted chars
        urlType.url = this.stripUrl(urlType.url);

        //split urls
        var urls = urlType.url.split(", ");

        for (var i = 0; i < urls.length; i++) {
            if (this.validUrl(urls[i]) && this.urlIsNew(urls[i])) {
                //add image to found list
                this.images.push(urls[i]);
            }
        }
    }
};

ImagePreloader.prototype.determineUrlAndType = function (element) {
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

    return {
        url: url,
        type: type
    };
};

ImagePreloader.prototype.hasGradient = function (url) {
    "use strict";
    return url.indexOf("gradient(") !== -1;
};

ImagePreloader.prototype.stripUrl = function (url) {
    "use strict";
    url = url.replace(/url\(\"/g, "");
    url = url.replace(/url\(/g, "");
    url = url.replace(/\"\)/g, "");
    url = url.replace(/\)/g, "");

    return url;
};

ImagePreloader.prototype.validUrl = function (url) {
    "use strict";
    if (url.length > 0 && !url.match(/^(data:)/i)) {
        return true;
    } else {
        return false;
    }
};

ImagePreloader.prototype.urlIsNew = function (url) {
    "use strict";
    return this.images.indexOf(url) === -1;
};

module.exports = ImagePreloader;