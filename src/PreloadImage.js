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

	//remove the source
	var src = this.element.attr("src");
	this.element.removeAttr("src");
	var that = this;

	//bind the load even
	setTimeout(function () {
		that.element.on("load error", that, function (e) {
			e.data.completeLoading();
		});

		//put the source back
		that.element.attr("src", src);
	}, 1);
};

PreloadImage.prototype.completeLoading = function () {
    this.parent.imageDone++;

    var percentage = (this.parent.imageDone / this.parent.imageCounter) * 100;

    console.log(percentage + "% - loaded " + this.element.attr("src"));

	//update the percentage of the loader
	this.parent.overlayLoader.updatePercentage(percentage);

	//all images done!
    if (this.parent.imageDone == this.parent.imageCounter) {
		this.parent.endLoader();
    }
};