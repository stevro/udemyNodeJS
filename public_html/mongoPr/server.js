var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017/myexample', function(err, db){
	if(err){
		return console.log(err);
	}
	console.log('mongodb connected');

	var collection = db.collection('users');
	collection.insert({name:'stefan'}, function(err, docs){
		if(err){
			return console.log(err);
		}

		console.log(docs);

		collection.find().toArray(function(err, users){
			if(err){
				return console.log(err);
			}
			console.log(users);
		});
	});
});