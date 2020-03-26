// Author :
// E-mail :

'use strict';
(function () {
	// Built-in Objects
	var handler = new Function();
	// ECMA Properties
	handler.prototype.name = '';
	handler.call(null, 0);
	Array.prototype.forEach.call([], function (item, index) {
		console.log(item);
		console.log(index);
	});
	// Host Objects
	var image = new Image();
	// DOM Related Properties
	var body = document.body;
	body.addEventListener('click', handler);
	// Web APIs Properties
	window.alert(navigator.userAgent);
}());
