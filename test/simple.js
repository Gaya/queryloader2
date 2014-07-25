var assert = require("assert");

describe('SliderInput', function() {
    describe('#registerListener()', function () {
        it('should be able to register a listener', function () {
            var slider = new SliderInput;

            //place mockListener in slider
            slider.registerListener(mockListener);

            //get registered listeners
            var listeners = slider.getListeners();

            //check listeners
            assert.equal(mockListener, listeners[0]);
        })
    });
});