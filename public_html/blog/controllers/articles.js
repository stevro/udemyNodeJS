var articles = [];

module.exports.create = function(req, res){
	req.body.comments = [];
	articles.push(req.body);
	res.redirect('/articles');
};
module.exports.index = function(req, res){
	res.json(articles);
}
module.exports.new = function(req, res){
res.send("<form method='post' action='/articles'>\
			<input type='text' placeholder='title' name='title'/>\
			<input type='text' placeholder='author' name='author' />\
			<textarea name='body' placeholder='body'></textarea>\
			<input type='submit' name='Submit'/>\
		</form>")
};