function PreloadImage(parent) {
    this.element;
    this.qlobj = parent;
};

PreloadImage.prototype.addToPreloader = function (preloader, url) {
    this.element = $("<img>").attr("src", url);
    this.element.appendTo(preloader.container);
    this.qlobj = preloader.parent;
};

PreloadImage.prototype.bindLoadEvent = function () {
    this.qlobj.imageCounter++;

    this.element.on("load error", this, function (e) {
        e.data.completeLoading();
    });
};

PreloadImage.prototype.completeLoading = function () {
    this.qlobj.imageDone++;

    var percentage = (this.qlobj.imageDone / this.qlobj.imageCounter) * 100;

    console.log(percentage + "%");

    //TODO: Update loading bar
//    base.qLbar.stop().animate({
//        width: percentage + "%",
//        minWidth: percentage + "%"
//    }, 200);

//    if (base.options.percentage == true) {
//        base.qLpercentage.text(Math.ceil(percentage) + "%");
//    }

    if (this.qlobj.imageDone == this.qlobj.imageCounter) {
        console.log("Done preloading");
        //base.endLoader();
    }
};