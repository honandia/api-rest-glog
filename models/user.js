//File models/user.js
var mongoose = require ('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	name : {type: String},
	password : {type: String},
	
	avatar : {type: String},	
	email : {type: String},
	facebook : {type: String},
	twitter : {type: String},
	web : {type: String},
	phone : {type: String}
});

module.exports = mongoose.model('User',userSchema);