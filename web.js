var express = require("express"),
    app     = express(),
    http    = require("http"),
    server  = http.createServer(app),
    mongoose = require('mongoose');
    

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.get('/', function(req, res) {
  res.send("GLOG!!");
});

routes = require('./routes/comments')(app);
routes = require('./routes/users')(app);
routes = require('./routes/zones')(app);


//mongoose.connect('mongodb://localhost/glogdb', function(err, res) {
//  var MONGOHQ_URL="mongodb://glodb:H*glogdb@troup.mongohq.com:10068/glogdb";
  
  mongoose.connect(process.env.MONGOHQ_URL, function(err, res) {
  
  //mongoose.connect(MONGOHQ_URL, function(err, res) {
  
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

var port = Number(process.env.PORT || 3000);
server.listen(port, function() {
  console.log("Node server running on " + port);
});

//mongodb://glogdb:H*glogdb@troup.mongohq.com:10068/glogdb