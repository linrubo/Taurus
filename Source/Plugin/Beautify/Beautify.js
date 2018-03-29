// Powered by js-beautify 1.7.5(8 Dec 2017)

'use strict';

var filepath = process.argv[2];
var filetype = filepath.split('.').slice(-1)[0];
var fs = require('fs');
var beautify = {
    'js' : require('./beautify-js.js').js_beautify,
    'css' : require('./beautify-css.js').css_beautify,
    'html' : require('./beautify-html.js').html_beautify,
    'htm' : require('./beautify-html.js').html_beautify
};
var option = {
    "jslint_happy": true
};
fs.readFile(filepath, 'utf8', function (err, data) {
    var result = beautify[filetype](data, option);
    process.stdout.write(result);
    if (err) {
        throw err;
    }
});