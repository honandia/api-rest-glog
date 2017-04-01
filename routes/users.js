//File: routes/users.js
module.exports = function(app) {

	var User = require ('../models/user.js');


	//GET - Return all users in the DB
findAllUsers = function(req, res) {
  	User.find(function(err, users) {
  		if(!err) {
  			res.send(users);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

//GET - Return a user with specified ID
findById = function(req, res) {
  User.findById(req.param.id, function(err, user) {
    if(!err) {
      res.send(user);
    } else {
      console.log('ERROR: ' + err);
    }
  });
};

//PUT - Return a user with specific name
findUserByName = function(req, res){
  User.find({name : req.body.name},
    {avatar:1,email:1,facebook:1,twitter:1,web:1,phone:1},
    function(err, user){
      
      if(!err) {
        res.send(user);
      } else {
        console.log('ERROR: ' + err);
      }

  });
};
//POST - Insert a new user in the DB
addUser = function(req, res) {
  console.log('POST');
  console.log(req.body);

  var user = new User({
	name:    req.body.name,
  password : req.body.password,
  avatar : req.body.avatar,

  email : req.body.email,
  facebook : req.body.facebook,
  twitter : req.body.twitter,
  phone: req.body.phone,
  web: req.body.web
  });

  user.save(function(err) {
    if(!err) {
      console.log('Created');
    } else {
      console.log('ERROR: ' + err);
    }
  });

  res.send(user);
};

//PUT - Update a user already exists
updateUser = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    
    user.name   = req.body.name;
    user.password = req.body.password;
    user.avatar = req.body.avatar;

    user.email = req.body.email;
    user.facebook = req.body.facebook;
    user.twitter = req.body.twitter;
    user.phone = req.body.phone;
    user.web = req.body.web;

    user.save(function(err) {
      if(!err) {
  	console.log('Updated');
      } else {
  	console.log('ERROR: ' + err);
      }
      res.send(user);
    });
  });
}

//DELETE - Delete a user with specified ID
deleteUser = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    user.remove(function(err) {
      if(!err) {
  	console.log('Removed');
      } else {
  	console.log('ERROR: ' + err);
      }
    })
  });
}

  //Link routes and functions
app.get('/users', findAllUsers);
app.get('/user/:id', findById);
app.put('/userbyname', findUserByName);
app.post('/user', addUser);
app.put('/user/:id', updateUser);
app.delete('/user/:id', deleteUser);

}