function PreloadContainer(parent) {
    this.toPreload = [];
    this.parent = parent;
};

PreloadContainer.prototype.create = function () {
    $("<div></div>").appendTo("body").css({
        display: "none",
        width: 0,
        height: 0,
        overflow: "hidden"
    });

    //add background images for loading
    for (var i = 0; this.toPreload.length > i; i++) {
        $.ajax({
            url: this.toPreload[i],
            type: 'HEAD',
            caller: this,
            complete: function (data) {
                console.log(this.caller);

                if (!this.caller.parent.destroyed) {
                    base.addImageForPreload(this['url']);
                }
            }
        });
    }
};

PreloadContainer.prototype.addImage = function (src) {
    console.log("Add to queue: " + src);
    this.toPreload.push(src);
};

PreloadContainer.prototype.preloadImage = function (url) {
//    var image = $("<img />").attr("src", url);
//    //binding load before the DOM adding
//    base.bindLoadEvent(image);
//    image.appendTo(base.qLimageContainer);
};