// Powered by JSLint(2018-03-21)

'use strict';

const fs = require('fs');
const jslint = require('./JSLint.js').jslint;

const filepath = process.argv[2];
const option = {
    browser: true,
	node: true,
    devel: true,
    multivar: true,
	single: true
};

const report = function (data) {
    let output = [],
        indent = '    ',
		warnings = data.warnings,
		globals = Object.keys(data.global.context).sort();

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
				warning.line += 1;
                warning.index = index + 1;
				output.push(indent + `${warning.index}. ${warning.message}  >>> in [line: ${warning.line}, column: ${warning.column}]`);
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

fs.readFile(filepath, 'utf8', function (err, data) {
	let result, output;

	if (err) {
        throw err;
    }

	result = jslint(data, option);
	output = report(result);
    console.log(output);
});