var assert = require("assert");

var Overlay = require("../src/Overlay/");
var LoadingBar = require("../src/Overlay/LoadingBar.js");
var Percentage = require("../src/Overlay/Percentage.js");
var Image = require("../src/ImagePreloader/Image.js");
var ImagePreloader = require("../src/ImagePreloader/");
var QueryLoader = require("../src/QueryLoader.js");

describe('LoadingBar', function() {
    describe('#create()', function () {
        var lb = new LoadingBar();
        lb.create();

        it('should create an element for itself', function () {
            assert.notEqual(null, lb.element);
            assert.notEqual("undefined", typeof lb.element);
            assert.notEqual("undefined", typeof lb.element.tagName);
            assert.equal("div", lb.element.tagName.toLowerCase());
            assert.equal(lb.className, lb.element.getAttribute("class"));
        });

        it('should apply default styling', function () {
            assert.equal("absolute", lb.element.style.position);
            assert.equal(lb.barHeight + "px", lb.element.style.height);
        });
    });

    describe('#updateProgress()', function () {
        it('should update the progress and adjust the loading bar', function () {
            var lb = new LoadingBar();
            lb.create();

            assert.equal("0%", lb.element.style.width);

            lb.updateProgress(10, 0);

            assert.equal("10%", lb.element.style.width);

            lb.updateProgress(50, 0);

            assert.equal("50%", lb.element.style.width);

            lb.updateProgress(100, 0);

            assert.equal("100%", lb.element.style.width);

            lb.updateProgress(-20, 0);

            assert.equal("0%", lb.element.style.width);

            lb.updateProgress(420, 0);

            assert.equal("100%", lb.element.style.width);
        });

        it('should not break on floats', function () {
            var lb = new LoadingBar();
            lb.create();

            lb.updateProgress(10.6, 0);

            assert.equal("10%", lb.element.style.width);

            lb.updateProgress(50.456, 0);

            assert.equal("50%", lb.element.style.width);
        });
    });
});

describe('Percentage', function() {
    describe('#create()', function () {
        var p = new Percentage();
        p.create();

        it('should create an element for itself', function () {
            assert.notEqual(null, p.element);
            assert.notEqual("undefined", typeof p.element);
            assert.notEqual("undefined", typeof p.element.tagName);
            assert.equal("div", p.element.tagName.toLowerCase());
            assert.equal(p.className, p.element.getAttribute("class"));
        });

        it('should apply default styling', function () {
            assert.equal("absolute", p.element.style.position);
        });
    });

    describe('#updateProgress()', function () {
        var p = new Percentage();
        p.create();

        it('should update the progress and adjust the loading bar', function () {
            assert.equal("0%", p.element.innerHTML);

            p.updateProgress(10, 0);

            assert.equal("10%", p.element.innerHTML);

            p.updateProgress(50, 0);

            assert.equal("50%", p.element.innerHTML);

            p.updateProgress(100, 0);

            assert.equal("100%", p.element.innerHTML);

            p.updateProgress(-20, 0);

            assert.equal("0%", p.element.innerHTML);

            p.updateProgress(420, 0);

            assert.equal("100%", p.element.innerHTML);
        });

        it('should not break on floats', function () {
            p.updateProgress(10.6, 0);

            assert.equal("10%", p.element.innerHTML);

            p.updateProgress(50.456, 0);

            assert.equal("50%", p.element.innerHTML);
        });
    });
});

describe('Overlay', function() {
    var fakeBody = document.createElement("body");

    describe('#create()', function () {
        var o = new Overlay(fakeBody);
        o.create();

        it('should create an element for itself', function () {
            assert.notEqual(null, o.element);
            assert.notEqual("undefined", typeof o.element);
            assert.notEqual("undefined", typeof o.element.tagName);
            assert.equal("div", o.element.tagName.toLowerCase());
            assert.equal(o.className, o.element.getAttribute("class"));
        });
    });

    describe('#calculatePosition()', function () {
        var o = new Overlay();

        it('should give the correct needed position of the overlay', function () {
            o.parentElement = fakeBody;

            assert.equal("fixed", o.calculatePosition());

            var fakeContainer = document.createElement("div");
            fakeContainer.style.position = "static";

            o.parentElement = fakeContainer;

            assert.equal("absolute", o.calculatePosition());
            assert.equal("relative", o.parentElement.style.position);

            o.parentElement.style.position = "absolute";

            assert.equal("absolute", o.calculatePosition());
        });
    });

    describe('#updateProgess()', function () {
        var o = new Overlay();
        o.parentElement = fakeBody;
        o.create();

        o.percentage = new Percentage();
        o.percentage.create();

        o.loadingBar = new LoadingBar();
        o.loadingBar.create();

        it('should update the loading progress of both percentage and loadingbar', function () {
            assert.equal("0%", o.percentage.element.innerHTML);
            assert.equal("0%", o.loadingBar.element.style.width);

            o.updateProgress(10, 0);

            assert.equal("10%", o.percentage.element.innerHTML);
            assert.equal("10%", o.loadingBar.element.style.width);
        });
    });
});

describe('Image', function() {
    describe('#constructor()', function () {
        it('should create an image object with given src', function () {
            var exampleImage = new Image("some/src");

            assert.equal("some/src", exampleImage.src);
        });

        it('should create a dom object with given src', function () {
            var exampleImage = new Image("some/src");

            assert.notEqual(-1, exampleImage.element.src.indexOf("some/src"));
        });
    });

    describe('#preload()', function () {
        it('should callback when an image is loaded', function (done) {
            var exampleImage = new Image("images/1.jpg");

            exampleImage.preload(done);
        });
    });
});

describe('QueryLoader', function() {
    describe('#createOverlay()', function () {
        var ql = new QueryLoader();

        it('should create an overlay when called', function () {
            ql.createOverlay();

            assert.equal(ql.overlay instanceof Overlay, true);
        });
    });

    describe('#createPreloader()', function () {
        var ql = new QueryLoader();

        it('should create the preloader', function () {
            ql.createPreloader();

            assert.equal(ql.preloader instanceof ImagePreloader, true);
        });
    });

    describe('#extend()', function () {
        it('should merge two objects', function () {
            var ql = new QueryLoader();

            var destination = {
                some: "thing",
                is: "not",
                right: "man"
            };

            var source = {
                some: "one",
                right: "dude"
            };

            assert.deepEqual({
                "some": "one",
                "is": "not",
                "right": "dude"
            }, ql.extend(destination, source));
        });
    });
});

describe('ImagePreloader', function() {
    "use strict";
    describe('#getImageSrcs()', function () {
        var ip = new ImagePreloader();

        var fakeImagesContainer = document.createElement("div");

        var img1 = document.createElement("img");
        img1.setAttribute("src", "fakeimg1.png");
        fakeImagesContainer.appendChild(img1);

        var img2 = document.createElement("img");
        img2.setAttribute("src", "fakeimg2.png");
        fakeImagesContainer.appendChild(img2);

        var img3 = document.createElement("section");
        img3.style.backgroundImage = "url(fakeimg3.png)";
        fakeImagesContainer.appendChild(img3);

        var img4 = document.createElement("section");
        img4.style.backgroundImage = "linear-gradient(left, #fff, #eee)";
        fakeImagesContainer.appendChild(img4);

        var img5 = document.createElement("section");
        img5.style.background = "url(fakeimg5.png)";
        fakeImagesContainer.appendChild(img5);

        it('should get all images within the given element', function () {
            var images = ip.getImageSrcs(fakeImagesContainer);

            assert.equal(4, images.length);
            assert.notEqual(-1, images[0].indexOf("fakeimg1.png"));
            assert.notEqual(-1, images[1].indexOf("fakeimg2.png"));
            assert.notEqual(-1, images[2].indexOf("fakeimg3.png"));
            assert.notEqual(-1, images[3].indexOf("fakeimg5.png"));
        });
    });

    describe('#hasGradient()', function () {
        var ip = new ImagePreloader();

        it('should check if given url has a gradient', function () {
            assert.equal(false, ip.hasGradient("hasnogradienthere.png"));
            assert.equal(false, ip.hasGradient("grasdfsadg"));
            assert.equal(true, ip.hasGradient("linear-gradient(left, #fff, #fff)"));
        });
    });

    describe('#stripUrl()', function () {
        var ip = new ImagePreloader();

        it('should strip the url() part from given src', function () {
            assert.equal(-1, ip.stripUrl("url(this/path/file.png)").indexOf("url"));
            assert.equal(-1, ip.stripUrl("file.png").indexOf("url"));
        });
    });

    describe('#validUrl()', function () {
        var ip = new ImagePreloader();

        it('should check if given url is valid', function () {
            assert.equal(false, ip.validUrl(""));
            assert.equal(false, ip.validUrl("data:blablabla"));
            assert.equal(true, ip.validUrl("/this/is/valid.png"));
        });
    });

    describe('#urlIsNew()', function () {
        var ip = new ImagePreloader();
        ip.sources = ["test.png", "something.png", "image.jpg"];

        it('should check if given url is new in this.images', function () {
            assert.equal(false, ip.urlIsNew("image.jpg"));
            assert.equal(true, ip.urlIsNew("new.png"));
        });
    });
});