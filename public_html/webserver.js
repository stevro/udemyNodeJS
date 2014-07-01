var path = require('path'),
	http = require('http'),
	fs = require('fs'),
	url = require('url'),
	mime = require('mime');

var server = http.createServer();

function genericSend(code, message, res){
	res.writeHead(code, {'Content-Type':'text/plain'});
	res.end(message);
};

server.on('request', function(req, res){
	var urlParams = url.parse(req.url);
		filename = path.join('.',urlParams.pathname);

		fs.exists(filename, function(exists){
			if(!exists){
				return genericSend(404, 'File not found!', res);
			}

			fs.readFile(filename, 'binary', function(err, file){
				if(err){
					return genericSend(500, 'Unable to read the file!', res);
				}

				var type = mime.lookup(filename);
				res.writeHead(200, {'Content-Type':type});
				res.write(file, 'binary');
				res.end();
			});
		});
});

server.listen(9000);