var assert = require("assert");

var LoadingBar = require("../src/Overlay/LoadingBar.js");

describe('LoadingBar', function() {
    describe('#create()', function () {
        it('should create an element for itself', function () {
            var lb = new LoadingBar();
            lb.create();

            assert.notEqual(null, lb.element);
            assert.notEqual("undefined", typeof lb.element);
            assert.notEqual("undefined", typeof lb.element.tagName);
            assert.equal("div", lb.element.tagName.toLowerCase());
            assert.equal(lb.className, lb.element.getAttribute("class"));
        });
    });

    describe('#updateProgress()', function () {
        it('should update the progress and adjust the loading bar', function () {
            var lb = new LoadingBar();
            lb.create();

            assert.equal(0, lb.element.style.width);

            lb.updateProgress(10, 0);

            assert.equal("10%", lb.element.style.width);

            lb.updateProgress(50, 0);

            assert.equal("50%", lb.element.style.width);

            lb.updateProgress(100, 0);

            assert.equal("100%", lb.element.style.width);

            lb.updateProgress(-20, 0);

            assert.equal("0", lb.element.style.width);

            lb.updateProgress(420, 0);

            assert.equal("100%", lb.element.style.width);
        });
    });
});

describe('Percentage', function() {
    describe('#create()', function () {
        it('should create an element for itself', function () {
            assert.equal(true, false);
        });
    });

    describe('#updateProgress()', function () {
        it('should update the progress and adjust the percentage', function () {
            assert.equal(true, false);
        });
    });
});

describe('QueryLoader', function() {
    describe('#createOverlay()', function () {
        it('should create an overlay when called', function () {
            assert.equal(true, false);
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
            assert.equal(true, false);
        });
    });
});