var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name:String,
	email:String
});

UserSchema.pre('remove', function(next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    articles.remove({user: this._id}).exec();
    comments.remove({user: this._id}).exec();
    next();
});

mongoose.model('user',UserSchema);