window.onload = function () {
    'use strict';
    var ql = new QueryLoader2(document.querySelector("body"), {
        barColor: "#6e6d73",
        backgroundColor: "#fff1b0",
        percentage: true,
        barHeight: 1,
        completeAnimation: "grow",
        minimumTime: 100
    });
};