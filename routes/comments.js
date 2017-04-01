//File: routes/comments.js
module.exports = function(app) {

  var Comment = require('../models/comment.js');

//GET - Return all coments in the DB
findAllComments = function(req, res) {
  	Comment.find(function(err, comments) {
  		if(!err) {
  			res.send(comments);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

//GET - Return a comment with specified ID
findById = function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    if(!err) {
      res.send(comment);
    } else {
      console.log('ERROR: ' + err);
    }
  });
};


//POST - Insert a new comment in the DB
addComment = function(req, res) {
  console.log('POST');
  console.log(req.body);

  var comment = new Comment({
	text:  req.body.text,
  date: req.body.date,
  zone_id: req.body.zone_id,
  user_id: req.body.user_id

  });

  comment.save(function(err) {
    if(!err) {
      console.log('Created');
    } else {
      console.log('ERROR: ' + err);
    }
  });

  res.send(comment);
};

//PUT - Update a coment already exists
updateComment = function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    comment.text   = req.body.text;

    comment.save(function(err) {
      if(!err) {
  	console.log('Updated');
      } else {
  	console.log('ERROR: ' + err);
      }

      res.send(comment);
    });
  });
}

//DELETE - Delete a Comment with specified ID
deleteComment = function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    comment.remove(function(err) {
      if(!err) {
  	console.log('Removed');
      } else {
  	console.log('ERROR: ' + err);
      }
    })
  });
}
  //Link routes and functions
app.get('/comments', findAllComments);
app.get('/comment/:id', findById);
app.post('/comment', addComment);
app.put('/comment/:id', updateComment);
app.delete('/comment/:id', deleteComment);
}