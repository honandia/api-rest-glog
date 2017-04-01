//File: models/zone.js
var mongoose = require ('mongoose'),
	Schema = mongoose.Schema;

var commentSchema = new Schema({
  //text:    { type: String },
  text:    { type: Buffer },
  date:    { type: Date , default: Date.now},
  user_id: { type: String}

});

var zoneSchema = new Schema({
	//location : [<longitude>,<latitude>],
	longitude : {type: Number}, //Double??
	latitude : {type: Number}, //Double??
	name : {type: String},
	desc : {type: String},

	//lastCommentText : {type: String},
	lastCommentText : {type: Buffer},
	lastCommentDate : {type: Date},
	lastCommentUser_id : {type: String},

	comments : [commentSchema]

});

module.exports = mongoose.model('Zone',zoneSchema);