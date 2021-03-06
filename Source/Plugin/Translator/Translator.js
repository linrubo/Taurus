// Powered by Bing-Translator

'use strict';

const http = require('https');

const query = process.argv[2];
const postData = '&fromLang=en&to=zh-Hans&text=' + query;

const option = {
	hostname: 'cn.bing.com',
	port: 443,
	path: '/ttranslatev3?IG=145DADAA8D4648BA96114FF77C6D80FB&IID=translator.5028.1',
	method: 'POST',
	headers: {
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': Buffer.byteLength(postData),
	}
};

const request = http.request(option, function (res) {
	let rawData = '';

	res.setEncoding('utf8');

	res.on('data', function (chunk) {
		rawData += chunk;
	});

	res.on('end', function () {
		let data = JSON.parse(rawData);

		if (data) {
			console.log(data[0].translations[0].text)
			process.exit(0);
		}
	});
});

request.on('error', function (e) {
	console.error(`problem with request: ${e.message}`);
});

request.write(postData);
request.end();