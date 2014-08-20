var assert = require("assert");

var Overlay = require("../src/Overlay/");
var LoadingBar = require("../src/Overlay/LoadingBar.js");
var Percentage = require("../src/Overlay/Percentage.js");

var Image = require("../src/ImagePreloader/Image.js");
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
        it('should create the preloader', function () {
            assert.equal(true, false);
        });
    });

    describe('#findImageInElement()', function () {
        it('should find all images in given element', function () {
            assert.equal(true, false);
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