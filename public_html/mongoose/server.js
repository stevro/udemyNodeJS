var express = require('express'),
	app = express(),
	port = process.env.PORT || 9000,
	mongoose = require('mongoose');


require ('./models/todo');

var todoController = require('./controllers/todo');

var logger = require('logger-request');
var bodyParser = require('body-parser');
var json = require('json');
mongoose.connect('mongodb://localhost/mongooseDemo');

app.use(bodyParser());
app.use(logger({console: true}));
app.set('view engine', 'ejs');

app.get('/', todoController.index);
app.post('/', todoController.create);
app.put('/:todoId', todoController.update);
app.delete('/:todoId', todoController.delete);

app.listen(port, function(err){
	console.log('listening on %s', port);
})