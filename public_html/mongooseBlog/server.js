var express = require('express'),
	app = express(),
	port = process.env.PORT || 9000,
	mongoose = require('mongoose');

require('./models/user');
require('./models/article');

var	userController = require('./controllers/user');
var	articleController = require('./controllers/article');
var	commentController = require('./controllers/comment');


mongoose.connect('mongodb://localhost/mongooseDemo2')

var logger = require('logger-request');
var bodyParser = require('body-parser');
app.use(bodyParser());
app.use(logger({console: true}));
app.set('view engine', 'ejs');

app.get('/articles',articleController.index);
app.get('/articles/:articleId',articleController.view);
app.post('/articles',articleController.create);
app.put('/articles/:articleId',articleController.update);
app.delete('/articles/:articleId',articleController.delete);

// app.get('/articles/:articleId/comments',commentController.index);
app.post('/articles/:articleId',commentController.create);
// app.put('/articles/:articleId/:commentId',commentController.update); //We don't want comment updates
app.delete('/articles/:articleId/:commentId',commentController.delete);

app.get('/users',userController.index);
app.post('/users',userController.create);
app.put('/users/:userId',userController.update);
app.delete('/users/:userId',userController.delete);

app.param('articleId',articleController.load);
app.param('userId',userController.load);

app.listen(port,function(err) {
	console.log('listening on %s',port);
});