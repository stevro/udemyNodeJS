var readline = require('readline'),
	rl = readline.createInterface(process.stdin,process.stdout);

rl.setPrompt("--> ");
rl.prompt();

var toDoList = [];

var commands = {
	ls:function(){
		console.log(toDoList);
	},
	add:function(item){
		toDoList.push(item);
	},
	rm: function(item){
		toDoList.pop(item);
	}
};

rl.on('line', function(line){
	var words = line.split(' ');
		command = words.shift();
		argsStr = words.join(' ');

	commands[command](argsStr);

	rl.prompt();
});