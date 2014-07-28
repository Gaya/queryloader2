var assert = require("assert");

var LoadingBar = require("../src/Overlay/LoadingBar.js");
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