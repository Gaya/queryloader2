function OverlayLoader(parent) {
	this.parent = parent;
	this.container;
	this.loadbar;
	this.percentageContainer;
};

OverlayLoader.prototype.createOverlay = function () {
	console.log("Creating the loader overlay");

	//determine postion of overlay and set parent position
	var overlayPosition = "absolute";

	if (this.parent.element.tagName.toLowerCase() == "body") {
		overlayPosition = "fixed";
	} else {
		var pos = this.parent.$element.css("position");
		if (pos != "fixed" || pos != "absolute") {
			this.parent.$element.css("position", "relative");
		}
	}

	//create the overlay container
	this.container = $("<div id='" + this.parent.options.overlayId + "'></div>").css({
		width: "100%",
		height: "100%",
		backgroundColor: this.parent.options.backgroundColor,
		backgroundPosition: "fixed",
		position: overlayPosition,
		zIndex: 666999, //very high!
		top: 0,
		left: 0
	}).appendTo(this.parent.$element);

	//create the loading bar
	this.loadbar = $("<div id='qLbar'></div>").css({
		height: this.parent.options.barHeight + "px",
		marginTop: "-" + (this.parent.options.barHeight / 2) + "px",
		backgroundColor: this.parent.options.barColor,
		width: "0%",
		position: "absolute",
		top: "50%"
	}).appendTo(this.container);

	//if percentage is on
	if (this.parent.options.percentage == true) {
		this.percentageContainer = $("<div id='qLpercentage'></div>").text("0%").css({
			height: "40px",
			width: "100px",
			position: "absolute",
			fontSize: "3em",
			top: "50%",
			left: "50%",
			marginTop: "-" + (59 + this.parent.options.barHeight) + "px",
			textAlign: "center",
			marginLeft: "-50px",
			color: this.parent.options.barColor
		}).appendTo(this.container);
	}

	//if no images... destroy
	if (!this.parent.preloadContainer.toPreload.length || this.parent.alreadyLoaded == true) {
		this.parent.destroyContainers();
	}
};

OverlayLoader.prototype.updatePercentage = function (percentage) {
	this.loadbar.stop().animate({
		width: percentage + "%",
		minWidth: percentage + "%"
	}, 200);

	//update textual percentage
	if (this.parent.options.percentage == true) {
		this.percentageContainer.text(Math.ceil(percentage) + "%");
	}
};