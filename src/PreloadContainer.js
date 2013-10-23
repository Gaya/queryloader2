function PreloadContainer(parent) {
    this.toPreload = [];
    this.parent = parent;
    this.container;
};

PreloadContainer.prototype.create = function () {
    this.container = $("<div></div>").appendTo("body").css({
        display: "none",
        width: 0,
        height: 0,
        overflow: "hidden"
    });

    //process the image queue
    this.processQueue();
};

PreloadContainer.prototype.processQueue = function () {
    //add background images for loading
    for (var i = 0; this.toPreload.length > i; i++) {
		if (!this.parent.destroyed) {
			this.preloadImage(this.toPreload[i]);
		}
    }
};

PreloadContainer.prototype.addImage = function (src) {
    console.log("Add to queue: " + src);
    this.toPreload.push(src);
};

PreloadContainer.prototype.preloadImage = function (url) {
    console.log("Add image to preload container");
    var image = new PreloadImage();
    image.addToPreloader(this, url);
    image.bindLoadEvent();
};