QueryLoader2
==============
QueryLoader2 serves the main purpose of pre-loading the images on your website by showing an overlay and a loading bar. It automatically fetches all your images and background images and pre-loads them before showing the web page.

[![Code Climate](https://codeclimate.com/github/Gaya/QueryLoader2/badges/gpa.svg)](https://codeclimate.com/github/Gaya/QueryLoader2)
[![Build Status](https://travis-ci.org/Gaya/queryloader2.svg?branch=master)](https://travis-ci.org/Gaya/queryloader2)

Compatibility
-------------
QueryLoader currently works in IE version 9+, Chrome, Safari and Firefox.

**No dependencies**, so **no** jQuery / Zepto / MooTools required.

Read the full post here: [http://blog.gaya.ninja/articles/queryloader2-preload-your-images-with-ease/](http://blog.gaya.ninja/articles/queryloader2-preload-your-images-with-ease/)

[View example of how QueryLoader2 works](http://scripts.gayadesign.com/queryLoader2/).

Example usage
-------------
Include the `queryloader2.min.js` script (which is in the root of this repository) in the head section of your webpage.

	<script src="queryloader2.min.js" type="text/javascript"></script>

Create a QueryLoader2 object like this for example:

	<script type="text/javascript">
        window.addEventListener('DOMContentLoaded', function() {
            QueryLoader2(document.querySelector("body"), {
                barColor: "#efefef",
                backgroundColor: "#111",
                percentage: true,
                barHeight: 1,
                minimumTime: 200,
                fadeOutTime: 1000
            });
        });
	</script>

Use with NPM / Browserify
-------------------------
First install QueryLoader as a dependency in your project:

	npm install queryloader2 --save-dev

Use it in a node / browserify project:

	var QueryLoader2 = require("queryloader2");

	var loader = QueryLoader2(document.querySelector("body"), {
    barColor: "#efefef",
    backgroundColor: "#111",
    percentage: true,
    barHeight: 1,
    minimumTime: 200,
    fadeOutTime: 1000
  });

jQuery usage
------------
Include jQuery and `queryloader2.min.js` scripts in the header.

	<script src="https://code.jquery.com/jquery-1.11.1.min.js" type="text/javascript"></script>
	<script src="queryloader2.min.js" type="text/javascript"></script>

Call QueryLoader in `$(document).ready()` like this:

	$(document).ready(function () {
		$("body").queryLoader2();
	});

Install using Bower
-------------------

	bower install queryloader2

Basic usage
-----------

	QueryLoader2(element, options);
	
Options
-------

**backgroundColor**
`string` background color of the loader (in hex).
Default: "#000"
	
**barColor**
`string` background color of the bar (in hex).
Default: "#FFF"

**barHeight**
`int` height of the bar in pixels.
Default: 1

**minimumTime**
`int` time in miliseconds which the loading has to run. If time has not passed the animation will still show.
Default: 500

**maxTime**
`int` maximum time in milliseconds the loader may take. Go past this time and the loader with automatically close.
Default: 10000

**fadeOutTime**
`int` time in miliseconds it takes for the overlay to fade out at the end.
Default: 1000

**deepSearch**
`boolean` set to true to find ALL images with the selected elements. If you don't want queryLoader to look in the children, set to false.
Default: true
	
**percentage**
`boolean` Set to true to enable percentage visualising.
Default: false

**onComplete**
`function` this function is called once the loading and animation are completed.
Default: none

**onProgress**
`function` this function is called when an image is loaded. Get parameters `percentage`, `imagesLoaded`, `totalImages`.
Default: none