var express = require('express'),
	app = express(),
	articles = require('./controllers/articles.js');

var bodyParser = require('body-parser');
var logger = require('logger-request');

app.listen(9000);

app.use(logger({console: true}));
app.use(bodyParser());

var notImplemented = function(req, res){
	res.send(501);
};

app.get('/articles', articles.index);
app.get('/articles/new', articles.new);
app.get('articles/:articleId', notImplemented);
app.post('/articles', articles.create);

app.put('/article/:articleId', notImplemented);
app.delete('/article/:articleId', notImplemented);

app.post('/articles/:articleId/comments', notImplemented);
app.delete('/articles/:articleId/comments/:commendId', notImplemented)


