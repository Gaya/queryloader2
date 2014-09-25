var Image = require('./Image.js');

function ImagePreloader(parent) {
    "use strict";
    this.parent = parent;
    this.sources = [];
    this.images = [];
    this.loaded = 0;
    this.deepSearch = true;
}

ImagePreloader.prototype.getImageSrcs = function (element) {
    "use strict";
    this.sources = [];

    if (typeof element !== "undefined") {
        this.findImageInElement(element);

        if (this.deepSearch === true) {
            var elements = element.querySelectorAll("*");
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].tagName !== "SCRIPT") {
                    this.findImageInElement(elements[i]);
                }
            }
        }
    }

    return this.sources;
};

ImagePreloader.prototype.findAndPreload = function (element) {
    "use strict";
    if (typeof element === "undefined") {
        return;
    }

    this.sources = this.getImageSrcs(element);

    for (var i = 0; i < this.sources.length; i++) {
        var image = new Image(this.sources[i]);
        image.preload(this.imageLoaded.bind(this));
        this.images.push(image);
    }
};

ImagePreloader.prototype.imageLoaded = function () {
    "use strict";
    this.loaded++;

    this.updateProgress();
};

ImagePreloader.prototype.updateProgress = function () {
    "use strict";
    this.parent.updateProgress(this.loaded, this.sources.length);
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
                var extra = "";

                if (this.isIE() || this.isOpera()){
                    //filthy always no cache for IE, sorry peeps!
                    extra = "?rand=" + Math.random();
                }

                //add image to found list
                this.sources.push(urls[i] + extra);
            }
        }
    }
};

ImagePreloader.prototype.determineUrlAndType = function (element) {
    "use strict";
    var url = "";
    var type = "normal";
    var style = element.currentStyle || window.getComputedStyle(element, null);

    if ((style.backgroundImage !== "" && style.backgroundImage !== "none") || (element.style.backgroundImage !== "" && element.style.backgroundImage !== "none")) {
        //if object has background image
        url = (style.backgroundImage || element.style.backgroundImage);
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
    return this.sources.indexOf(url) === -1;
};

ImagePreloader.prototype.isIE = function () {
    "use strict";
    return navigator.userAgent.match(/msie/i);
};

ImagePreloader.prototype.isOpera = function () {
    "use strict";
    return navigator.userAgent.match(/Opera/i);
};

module.exports = ImagePreloader;