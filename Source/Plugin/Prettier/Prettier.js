// Powered by Prettier@1.13.0

'use strict';

const fs = require('fs');
const path = require('path');
const prettier = require('./standalone.js');
const plugins = [
	require('./parser-babylon.js'),
	require('./parser-flow.js'),
	require('./parser-markdown.js'),
	require('./parser-postcss.js'),
	require('./parser-typescript.js'),
	require('./parser-vue.js')
];

const filepath = process.argv[2];
const extname = path.extname(filepath);
const parserMap = {
	'.css': 'css',
	'.less': 'less',
	'.scss': 'scss',
	'.md': 'markdown',
	'.ts': 'typescript',
	'.vue': 'vue'
};
const option = {
    tabWidth: 4,
	useTabs: true,
	singleQuote: true,
	parser: parserMap[extname] || 'babylon',
	plugins: plugins
};

fs.readFile(filepath, 'utf8', function (err, data) {
	let result;

	if (err) {
        throw err;
    }

	try {
		result = prettier.format(data, option);
	} catch (e) {
		console.log(e);
	}

    process.stdout.write(result);
});