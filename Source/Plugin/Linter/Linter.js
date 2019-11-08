// Powered by JSLint(2019-09-17)

'use strict';

const fs = require('fs');
const path = require('path');
const jslint = require('./JSLint.js').jslint;

const filepath = process.argv[2];
const extname = path.extname(filepath);
const option = {
    browser: true,
    devel: true,
	node: true,
	single: true
};

const report = function (data) {
    const output = [];
	const indent = '    ';
	const warnings = data.warnings;
	const globals = Object.keys(data.global.context).sort();

    if (warnings.length) {
        if (data.json) {
            output.push('\nJSON: bad.');
        }
		if (data.stop) {
			output.push('\nJSLint was unable to finish.');
		}
        output.push('\nWarning:');
        warnings.forEach(function (warning, index) {
            if (warning) {
				output.push(indent + `${index + 1}. ${warning.message}  >>> in [line: ${warning.line + 1}, column: ${warning.column}]`);
            }
        });
    } else {
        if (data.json) {
            output.push("\nJSON: good.");
        }
    }

    if (globals.length) {
        output.push('\nGlobal:');
        output.push(indent + globals.join(', '));
    } else {
        output.push("\nNo new global variables introduced.");
    }

	output.push('\nPowered by JSLint ' + data.edition);

    return output.join('\n');
};

if (/\.js(?:on)?/i.test(extname) === false) {
	throw new Error('file type must be js or json');
}

fs.readFile(filepath, 'utf8', function (err, data) {
	let result;
	let output;

	if (err) {
        throw err;
    }

	result = jslint(data, option);
	output = report(result);

    console.log(output);
});