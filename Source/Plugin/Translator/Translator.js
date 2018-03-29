// Powered by Bing-Translator

'use strict';

var query = process.argv[2];
var http = require('http');

var postData = 'from=en&to=zh-CHS&text=' + query;
var option = {
	hostname: 'cn.bing.com',
	port: 80,
	path: '/ttaTranslate?IG=F5EBE23F525341CFBA67480809C9E7F6&IID=SERP.5515',
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': Buffer.byteLength(postData),
	}
};

var request = http.request(option, function (res) {
	var rawData = '';

	res.setEncoding('utf8');

	res.on('data', function (chunk) {
		rawData += chunk;
	});

	res.on('end', function () {
		var data = JSON.parse(rawData);
		if (data && data.translationResponse) {
			console.log(data.translationResponse)
			process.exit(0);
		}
	});
});

request.on('error', function (e) {
	console.error(`problem with request: ${e.message}`);
});

request.write(postData);
request.end();