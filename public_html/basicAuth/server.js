var express = require('express'),
	app = express(),
	port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.logger());

app.get('/',function(req,res) {
	res.send('home');
});

app.get('/about',function(req,res) {
	res.send('about');
});

var auth = express.basicAuth('admin','admin');

app.get('/admin',auth,function(req,res) {
	res.send('admin');
});

app.all("/secure/*",auth);

app.post('/secure/whatever');
app.get('/secure/somethingElse');


app.listen(port,function(err) {
	console.log('listening on %s',port);
});