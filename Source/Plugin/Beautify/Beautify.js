// Powered by js-beautify@1.10.2

'use strict';

const fs = require('fs');
const path = require('path');
const js_beautify = require('./beautify-js.js').js_beautify;
const css_beautify = require('./beautify-css.js').css_beautify;
const html_beautify = require('./beautify-html.js').html_beautify;

const filepath = process.argv[2];
const extname = path.extname(filepath);
const option = {
	"indent_with_tabs": true,
    "jslint_happy": true
};

const beautify = function (data) {
	let result;

	switch (extname) {
	case '.json':
	case '.js':
		result = js_beautify(data, option);
		break;
	case '.css':
		result = css_beautify(data, option);
		break;
	case '.html':
	case '.htm':
		result = html_beautify(data, option);
		break;
	default:
		result = data;
	}

	return result;
};

fs.readFile(filepath, 'utf8', function (err, data) {
    if (err) {
        throw err;
    }

    console.log(beautify(data));
});