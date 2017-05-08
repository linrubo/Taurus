// Author :
// E-mail :

'use strict';
(function () {
	//Class
	var handler = new Function();
	//ECMA Properties/function
	handler.prototype.name = '';
	handler.call(null, 0);
	//DOM Properties/function
	var body = document.body;
	body.addEventListener('click', handler);
	//BOM Properties/function
	window.alert(navigator.userAgent);
}());
