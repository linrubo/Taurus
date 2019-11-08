// Powered by javascript-obfuscator@0.18.1

'use strict';

const fs = require('fs');
const path = require('path');
const Obfuscator = require('./index.browser.js');

const filepath = process.argv[2];
const pathInfo = path.parse(filepath);
const option = {};

const output = function (data) {
    let filename = pathInfo.name;

    if (filename.includes('.source')) {
        filename = filename.replace('.source', '');
    } else {
        filename += '.obf';
    }

    pathInfo.name = filename;
	pathInfo.base = filename + pathInfo.ext;

    fs.writeFile(path.format(pathInfo), data, (err) => {
        if (err) {
			throw err;
		}
        console.log('This file is obfuscate to complete!');
    });
};

if (pathInfo.ext !== '.js') {
	throw new TypeError('file type must be js');
}

fs.readFile(filepath, 'utf8', function (err, data) {
	let obfuscated;

    if (err) {
        throw err;
    }

    try {
		obfuscated = Obfuscator.obfuscate(data, option).getObfuscatedCode();
		output(obfuscated);
    } catch (e) {
		console.error(`problem with: ${e.message}`);
    }
});