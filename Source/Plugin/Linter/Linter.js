// Powered by JSLint(2018-03-21)

var filepath = process.argv[2];
var fs = require('fs');
var jslint = require('./JSLint.js').jslint;
var option = require('./Option.js').option;

var report = function (data) {
	'use strict';
    var output = [],
        indent = '    ',
		warnings = data.warnings,
		global = Object.keys(data.global.context).sort();

    if (warnings.length) {
        if (data.json) {
            output.push('\nJSON: bad.\n');
        }
		if (data.stop) {
			output.push('\nJSLint was unable to finish.\n');
		}
        output.push('\nWarning:\n');
        warnings.forEach(function (warning, index) {
            var template = "{index}. {message}  >>> in [line: {line}, column: {column}]\n",
				pattern = /\{([^{}]*)\}/g,
				replacement = function (match, name) {
					var reserve = {
						message: '',
						line: 0,
						column: 0
					};
					return warning[name] || reserve[name];
				};
            if (warning) {
				warning.line += 1;
                warning.index = index + 1;
                output.push(indent + template.replace(pattern, replacement));
            }
        });
    } else {
        if (data.json) {
            output.push("\nJSON: good.\n");
        }
    }

    if (global.length) {
        output.push('\nGlobal:\n');
        output.push(indent + global.join(', ') + '\n');
    } else {
        output.push("\nNo new global variables introduced.\n");
    }

	output.push('\nPowered by JSLint ' + data.edition);
    return output.join('');
};

fs.readFile(filepath, 'utf8', function (err, data) {
	'use strict';
    var result = jslint(data, option);
	var output = report(result);
    console.log(output);
    if (err) {
        throw err;
    }
});