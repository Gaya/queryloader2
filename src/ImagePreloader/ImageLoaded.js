/*
 * Modified version of http://github.com/desandro/imagesloaded v2.1.1
 * MIT License. by Paul Irish et al.
 */

var BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

function loaded(image, callback) {
    "use strict";
    var src;

    if (!image.nodeName) { return callback(new Error('First argument must be an image element')); }
    if (image.nodeName.toLowerCase() !== 'img') { return callback(new Error('Element supplied is not an image')); }
    if (image.src  && image.complete && image.naturalWidth !== undefined) { return callback(null, true); }

    function eventBind(attach, event, callback) {
        if (!image.addEventListener) {
            image[(attach ? 'attachEvent' : 'detachEvent')]('on' + event, callback);
        } else {
            image[(attach ? 'addEventListener' : 'removeEventListener')](event, callback, false);
        }
    }

    function onloaded() {
        eventBind(false, 'load', onloaded);
        eventBind(false, 'onerror', onloaded);
    }

    eventBind(true, 'load', onloaded);
    eventBind(true, 'onerror', onloaded);

    if (image.readyState || image.complete) {
        src = image.src;
        image.src = BLANK;
        image.src = src;
    }
}

module.exports = loaded;
