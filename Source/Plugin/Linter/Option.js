'use strict';

var option = {
    browser: true,
	node: true,
    devel: true,
    multivar: true,
	single: true
};

if (typeof define === "function" && define.amd) {
	// Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
	define([], function() {
		return { option: option };
	});
} else if (typeof exports !== "undefined") {
	// Add support for CommonJS. Just put this file somewhere on your require.paths
	// and you will be able to `var option = require("option").option.
	exports.option = option;
} else if (typeof window !== "undefined") {
	// If we're running a web page and don't have either of the above, add our one global
	window.option = option;
} else if (typeof global !== "undefined") {
	// If we don't even have window, try global.
	global.option = option;
}