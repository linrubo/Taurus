// Powered by prettier 1.8.2

'use strict';

const fs = require('fs');
const path = require('path');
const prettier = require('./prettier-1.8.2.js');

const filepath = process.argv[2];
const extname = path.extname(filepath);
const option = {
    tabWidth: 4,
	useTabs: true,
	singleQuote: true
};

switch (extname) {
case '.css':
	option.parser = 'css';
	break;
case '.md':
	option.parser = 'markdown';
	break;
default:
	option.parser = 'babylon';
}

fs.readFile(filepath, 'utf8', function (err, data) {
    let result = prettier.format(data, option);

    process.stdout.write(result);

	if (err) {
        throw err;
    }
});