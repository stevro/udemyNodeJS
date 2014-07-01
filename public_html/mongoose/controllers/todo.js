var mongoose = require('mongoose'),
	Todo = mongoose.model('todo'),
	controller = {};

controller.index = [
	function  (req, res, next) {
		Todo.find({},function(err, todos){
			if(err) return next(err);
			res.render('todo/index', {todos:todos})
		});
	}
];

controller.create = [
	function(req, res, next){
		if("name" in req.body && req.body.name !== ''){
			next();
		}else{
			res.send(400);
		}

	},
	function (req, res, next){
		Todo.create(req.body, function(err, todo){
			if(err) return next(err);
			res.redirect('/');
		});
	}
];

controller.update = [
	function (req,res, next){
		Todo.findById(req.param('todoId'), function(err, todo){
			if(err) return next(err);
			if(!todo) return res.send(404);
			req.todo = todo;
			next();
		});
	},
	function(req, res, next){
		for(key in req.body){
			req.todo[key] = req.body[key];
		}
		req.todo.save(function(err, todo){
			if(err) return next(err);
			res.json(todo);
		});
	}
];

controller.delete = [
	function (req,res, next){

	}
];

module.exports = controller;