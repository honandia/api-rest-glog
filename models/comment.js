//File: models/comment.js
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var commentSchema = new Schema({
  text:    { type: String },
  date:    { type: Date },
  zone_id: { type: String},
  user_id: { type: String}

});

module.exports = mongoose.model('Comment', commentSchema);