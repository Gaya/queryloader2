window.addEventListener('DOMContentLoaded', function() {
    "use strict";
    var ql = new QueryLoader2(document.querySelector("body"), {
        barColor: "#efefef",
        backgroundColor: "#111",
        percentage: true,
        barHeight: 1,
        minimumTime: 200,
        fadeOutTime: 1000
    });
});
