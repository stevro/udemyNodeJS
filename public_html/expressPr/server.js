var express = require('express'),
	app = express();
	var logger = require('logger-request');
//app.use(express.logger_request());

app.use(logger({
    filename : 'foo.log',
    console: true,
    level: 'debug'
}));

app.get('/hello', function(req, res){
	res.send('hello world');
});

app.get('/goodbye', function(req, res){
	res.send('goodbye world');
});

app.all("*",function(req, res){
	res.send(404);
});

app.listen(9000, function(){
	console.log('server is running on 9000')
});