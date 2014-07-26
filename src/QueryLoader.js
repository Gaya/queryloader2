var ImagePreloader = require('./ImagePreloader/ImagePreloader.js');
var Overlay = require('./Overlay/Overlay.js');

function QueryLoader(element, options) {
    this.element = element;
    this.options = options;

    //The default options
    this.defaultOptions = {
        onComplete: function() {},
        onLoadComplete: function() {},
        backgroundColor: "#000",
        barColor: "#fff",
        overlayId: 'qLoverlay',
        barHeight: 1,
        percentage: false,
        deepSearch: true,
        completeAnimation: "fade",
        minimumTime: 500
    };

    if (element !== null) {
        this.init();
    }
}

QueryLoader.prototype.init = function () {
    console.log(this.element);
};

QueryLoader.prototype.extend = function () {

};

module.exports = QueryLoader;