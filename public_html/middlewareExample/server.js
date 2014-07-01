var express = require('express'),
	app = express(),
	port = process.env.PORT || 8080,

app.use(express.json());
app.use(express.urlencoded());
app.use(express.logger());

//"Normal way" -- too nested
app.post('/users',function(req,res) {
	Users.create(req.body,function(err,user) {
		res.render();
		resizePhoto('',function(err,thumbnail) {
			api1.call(user,function() {
				api2.call(user,function() {

				});
			});
		})
	})
	//create them in the database
	//resize a photo to make a thumbnail
	//make third party API calls, and computations based on them
	//response.
});
var makeThumbnail = function(req,res,next) {
	//we have user
	console.log("user" in req) // ==> true

	resizePhoto('',function(err,thumbnail) {
		next();
	});
};
//awesome way
app.post('/users',[
	function(req,res,next) {
		Users.create(req.body,function(err,user) {
			//check for err
			req.user = user;
			res.render('waiting');
			next();
		});
	},
	makeThumbnail,
	function(req,res,next) {}
]);

app.listen(port,function(err) {
	console.log('listening on %s',port);
});