/*
 * QueryLoader v2 - A simple script to create a preloader for images
 *
 * For instructions read the original post:
 * http://www.gayadesign.com/diy/queryloader2-preload-your-images-with-ease/
 *
 * Copyright (c) 2011 - Gaya Kessler
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Version:  2.0
 *
 */
(function($) {
    var qLimages = new Array;
    var qLdone = 0;

    var qLimageContainer = "";
    var qLoverlay = "";
    var qLbar = "";

    var qLoptions = {
        onComplete: function () {},
        backgroundColor: "#000",
        barColor: "#fff"
    }

    var afterEach = function () {
        createPreloadContainer();
        createOverlayLoader();
    }

    var createPreloadContainer = function() {
        qLimageContainer = $("<div></div>").appendTo("body").css({
            display: "none",
            width: 0,
            height: 0,
            overflow: "hidden"
        });
        for (var i = 0; qLimages.length > i; i++) {
            var image = $("<img />").attr("src", qLimages[i]).bind("load", function () {
                completeImageLoading();
            });
        }
    }

    var completeImageLoading = function () {
        qLdone++;

        var percentage = (qLdone / qLimages.length) * 100;
        $(qLbar).stop().animate({
            width: percentage + "%"
        }, 200);

        if (qLdone == qLimages.length) {
            destroyQueryLoader();
        }
    }

    var destroyQueryLoader = function () {
        $(qLimageContainer).remove();
        $(qLoverlay).fadeOut(500, function () {
            $(qLoverlay).remove();
            qLoptions.onComplete();
        });
    }

    var createOverlayLoader = function () {
        qLoverlay = $("<div id='qLoverlay'></div>").css({
            width: "100%",
            height: "100%",
            backgroundColor: qLoptions.backgroundColor,
            backgroundPosition: "fixed",
            position: "fixed",
            top: 0,
            left: 0
        }).appendTo("body");
        qLbar = $("<div></div>").css({
            height: "1px",
            backgroundColor: qLoptions.barColor,
            width: "0%",
            position: "absolute",
            top: "50%"
        }).appendTo(qLoverlay);
    }

    $.fn.queryLoader2 = function(options) {
        if(options) {
            $.extend(qLoptions, options );
        }

        this.each(function() {
            $(this).find("*:not(script)").each(function() {
                var url = "";
                
                if ($(this).css("background-image") != "none") {
                    var url = $(this).css("background-image");
                } else if (typeof($(this).attr("src")) != "undefined" && this.nodeName.toLowerCase() == "img") {
                    var url = $(this).attr("src");
                }

                url = url.replace("url(\"", "");
                url = url.replace("url(", "");
                url = url.replace("\")", "");
                url = url.replace(")", "");

                if (url.length > 0) {
                    var extra = "";
                    if ($.browser.msie && $.browser.version < 9) {
                        extra = "?" + Math.floor(Math.random() * 3000);
                    }
                    qLimages.push(url + extra);
                }
            });

        });

        afterEach();

        return this;
    };

})(jQuery);