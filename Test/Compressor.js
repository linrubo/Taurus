/*jslint
    node: true
*/
var filepath = process.argv[2];
var fs = require('fs');
var jslint = require('./jslint.js').jslint;
var option = {
    browser: true,
    devel: true,
    sloppy: true,
    nomen: true,
    regexp: true
};
var report = function (data) {
    'use strict';
    var output = [],
        indent = '    ';
    if (data.errors.length) {
        if (data.json) {
            output.push('\nJSON: bad.\n');
        }
        output.push('\nErrors:\n');
        data.errors.forEach(function (warning, index) {
            var template = "{index}. {reason}  >>>in [{filepath}] [line: {line},character: {character}]{evidence}\n",
                pattern = /\{([^{}]*)\}/g,
                displace = function (match, name) {
                    return warning[name] || '';
                };
            if (warning) {
                warning.index = index + 1;
                warning.filepath = filepath;
                output.push(indent + template.replace(pattern, displace));
            }
        });
    } else {
        if (data.json) {
            output.push("\nJSON: good.\n");
        }
    }
    if (data.global.length) {
        output.push('\nGlobal:\n');
        output.push(indent + data.global.sort().join(', ') + '\n');
    } else {
        output.push("\nNo new global variables introduced.\n");
    }
    return output.join('');
};

fs.readFile(filepath, 'utf8', function (err, data) {
    'use strict';
    var result;
    jslint(data, option);
    result = report(jslint.data());
    console.log(result);
    if (err) {
        throw err;
    }
});