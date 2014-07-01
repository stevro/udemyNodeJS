var express = require('express'),
	app = express(),
	port = 9000,
	MongoClient = require('mongodb').MongoClient;
var logger = require('logger-request');
var bodyParser = require('body-parser');

app.use(logger({console: true}));
app.use(bodyParser());

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

MongoClient.connect('mongodb://127.0.0.1:27017/myExample1', function(err, db){
	if(err) throw err;

	var collection = db.collection('members');

	var index = function(req, res){
		collection.find().toArray(function(err, members){
			//res.render('index', {members:members});
		});
	};

	var addMember = function(req,res){
		collection.insert(req.body, function(err, docs){
			if(err) return console.log(err);
			console.log(docs);
			res.redirect('members');
		});
	};

	app.get('/members', index);
	app.post('/members', addMember);

	app.listen(port);
	console.log('server on %s', port);
});

process.on('uncaughtException', function(e){
	console.log(e);
});