// Powered by Bing-Dict

'use strict';

var query = process.argv[2];
var http = require('http');

var pattern = /<div id="dict_ans"(.+)查看更多释义/;
var parse = function (html) {
	var desc = html.match(pattern);
	var result;

	if (desc && desc[0]) {
		// 过滤掉非div元素
		// 捕获非标签内容并合并
		// 去掉标签括号
		// 词性或tag后插入空格
		// 替换字符实体
		result = desc[0].replace(/<\/?(?!div)\w+(?: [^>]+)?>/g, "").
			match(/>[^<>]+</g).slice(0, -1).join('\n').
			replace(/[<>]/g, '').
			replace(/(^[a-z]+\.|网络|变形|例句|搭配|\])/gm, '$1 ').
			replace(/&#(\d+);/g, function (full, n) {
				return String.fromCharCode(n);
			});
	}

	if (result) {
		console.log(result);
	}
};

http.get('http://cn.bing.com/search?q=' + query, function (res) {
	var rawData = '';
	var locked = false;

	res.setEncoding('utf8');

	res.on('data', function (chunk) {
		rawData += chunk;
		if (pattern.test(rawData) && locked === false) {
			locked = true;
			parse(rawData);
			process.exit(0);
		}
	});

	//res.on('end', function() {});

	res.on('error', function () {
		console.log(chalk.red('Failed to query'));
		process.exit(0);
	});
});