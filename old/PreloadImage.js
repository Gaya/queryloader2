function PreloadImage(parent) {
    this.element;
    this.parent = parent;
};

PreloadImage.prototype.addToPreloader = function (preloader, url) {
	console.log("Creating image with url: " + url);
    this.element = $("<img />").attr("src", url);
    this.element.appendTo(preloader.container);
    this.parent = preloader.parent;
};

PreloadImage.prototype.bindLoadEvent = function () {
    this.parent.imageCounter++;

    //binding
    this.element[0].ref = this;

    new imagesLoaded(this.element, function (e) {
        e.elements[0].ref.completeLoading();
    });
};

PreloadImage.prototype.completeLoading = function () {
    this.parent.imageDone++;

    var percentage = (this.parent.imageDone / this.parent.imageCounter) * 100;

    console.log(percentage + "% - loaded " + this.element.attr("src"));

	//update the percentage of the loader
	this.parent.overlayLoader.updatePercentage(percentage);

	//all images done!
    if (this.parent.imageDone == this.parent.imageCounter || percentage >= 100) {
		this.parent.endLoader();
    }
};