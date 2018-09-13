// Powered by Bing-Dict

'use strict';

const https = require('https');

const query = process.argv[2];
const pattern = /<div id="dict_ans"(.+)查看更多释义/;
const parse = function (html) {
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

const options = {
    hostname: 'cn.bing.com',
    port: 443,
    path: '/search?q=' + query,
    method: 'GET',
	headers: {
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
		'Cookie': '_SS=SID=166D6B861FCF6B8A1E4660631EE16A20&HV=1525531982'
	}
};

const request = https.request(options, (res) => {
    let rawData = '';
	let locked = false;

	res.setEncoding('utf8');

    res.on('data', (chunk) => {
		rawData += chunk;
		if (pattern.test(rawData) && locked === false) {
			locked = true;
			parse(rawData);
			process.exit(0);
		}
    });

	res.on('end', () => {
		//console.log(rawData);
	});

});

request.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
	process.exit(0);
});

request.end();