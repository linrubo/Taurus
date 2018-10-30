// Powered by https://www.minifier.org/

'use strict';

const fs = require('fs');
const http = require('https');
const path = require('path');
const querystring = require('querystring');

const filepath = process.argv[2];
const pathInfo = path.parse(filepath);

const output = function (data) {
    let filename = pathInfo.name;

    if (filename.includes('.source')) {
        filename = filename.replace('.source', '');
    } else {
        filename += '.min';
    }

    pathInfo.name = filename;
	pathInfo.base = filename + pathInfo.ext;

    fs.writeFile(path.format(pathInfo), data, (err) => {
        if (err) {
			throw err;
		}
        console.log('This file is compressed to complete!');
    });
};
const minify = function (data) {
    let postData = querystring.stringify(data);
    let option = {
        hostname: 'minify.minifier.org',
        port: 443,
        path: '/',
        method: 'POST',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Content-Length': Buffer.byteLength(postData),
        }
    };

    let request = http.request(option, function (res) {
        let rawData = '';

        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            rawData += chunk;
        });

        res.on('end', function () {
            let data = JSON.parse(rawData);
            if (data && data.minified) {
                output(data.minified);
            }
        });
    });

    request.on('error', function (e) {
        console.error(`problem with request: ${e.message}`);
    });

    request.write(postData);
    request.end();
};

fs.readFile(filepath, 'utf8', function (err, data) {
    let param = {};

    if (err) {
        throw err;
    }

    param.source = data;
    switch (pathInfo.ext) {
    case '.js':
        param.type = 'js';
        break;
    case '.css':
        param.type = 'css';
        break;
    default:
        throw new TypeError('file type must be js or css');
    }

    minify(param);
});