/*
 * Modified version of http://github.com/desandro/imagesloaded v2.1.1
 * MIT License. by Paul Irish et al.
 */

var BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='

function loaded(image, callback) {
    "use strict";
    var src;

    if (!image.nodeName) {
        return callback(new Error('First argument must be an image element'));
    }

    if (image.nodeName.toLowerCase() !== 'img') {
        return callback(new Error('Element supplied is not an image'));
    }
    if (image.src && image.complete && image.naturalWidth !== undefined) {
        return callback(null, true);
    }

    function bindEvent(element, event, attach, cb) {
        if (!element.addEventListener) {
            element[(attach ? 'attachEvent' : 'detachEvent')]('on' + event, cb);
        } else {
            element[(attach ? 'addEventListener' : 'removeEventListener')](event, cb);
        }
    }

    function onload() {
        bindEvent(image, 'load', false, onload);
        bindEvent(image, 'error', false, onload);

        callback(null, false);
    }

    bindEvent(image, 'load', true, onload);
    bindEvent(image, 'error', true, onload);

    if (image.readyState || image.complete) {
        src = image.src;
        image.src = BLANK;
        image.src = src;
    }
}

module.exports = loaded;