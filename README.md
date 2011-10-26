QueryLoader v2
==============

QueryLoader v2 is a beter version of the old script posted in 2009. It serves the main purpose of preloading the images on your website by showing an overlay and a loading bar. It automaticaly fetches all your images and background images and preloads them before showing the webpage.
QueryLoader currently works with jQuery v1.6.4 and in IE version > 7, Chrome, Safari and Firefox.

How to use
----------

Include the script in the head section of your webpage.

	<script src="path/to/file/jquery.queryloader2.js" type="text/javascript"></script>

Be sure to add it after you include jQuery.

Now call QueryLoader in a $(document).ready(); call eg:

	$(document).ready(function () {
		$("body").queryLoader2();
	});

Basic usage
-----------

    $(selector).queryLoader2(options);
	
Options
-------

	### backgroundColor
	(string) background color of the loader (in hex).
	
	### barColor
	(string) background color of the bar (in hex).
	
	### onComplete
	(function) this function is called once the loading is complete.