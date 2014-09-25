/*
 * Modified version of http://github.com/desandro/imagesloaded v2.1.1
 * MIT License. by Paul Irish et al.
 */

var BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='

function loaded(image, callback) {
    "use strict";
    var src, old;

    if (!image.nodeName) {
        return callback(new Error('First argument must be an image element'));
    }

    if (image.nodeName.toLowerCase() !== 'img') {
        return callback(new Error('Element supplied is not an image'));
    }
    if (image.src && image.complete && image.naturalWidth !== undefined) {
        return callback(null, true);
    }

    old = !image.addEventListener;

    function onload() {
        if (old) {
            image.detachEvent('onload', onload);
            image.detachEvent('onerror', onload);
        } else {
            image.removeEventListener('load', onload, false);
            image.removeEventListener('error', onload, false);
        }
        callback(null, false);
    }

    if (old) {
        image.attachEvent('onload', onload);
        image.attachEvent('onerror', onload);
    } else {
        image.addEventListener('load', onload, false);
        image.addEventListener('error', onload, false);
    }

    if (image.readyState || image.complete) {
        src = image.src;
        image.src = BLANK;
        image.src = src;
    }
}

module.exports = loaded;