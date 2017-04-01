//File: routes/zones.js
module.exports = function(app) {
	var Zone = require ('../models/zone.js');


	//GET - Return all zones in the DB
findAllZones = function(req, res) {
  	Zone.find(function(err, zones) {
  		if(!err) {
  			res.send(zones);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

//GET - Return a zone with specified ID
findById = function(req, res) {
  Zone.findById(req.params.id, function(err, zone) {
    if(!err) {
      res.send(zone);
    } else {
      console.log('ERROR: ' + err);
    }
  });
};


//POST - Insert a new zone in the DB
addZone = function(req, res) {
  console.log('POST');
  console.log(req.body);

  var zone = new Zone({
	
	longitude : req.body.longitude,
	latitude : req.body.latitude,
	name : req.body.name,
  desc : req.body.desc,
  lastCommentText : req.body.lastCommentText,
  lastCommentDate : req.body.lastCommentDate,
  lastCommentUser_id : req.body.lastCommentUser_id

  });

  zone.save(function(err) {
    if(!err) {
      console.log('Created');
    } else {
      console.log('ERROR: ' + err);
    }
  });

  res.send(zone);
};

//PUT - Update a zone already exists
updateZone = function(req, res) {
  Zone.findById(req.params.id, function(err, zone) {
    
  zone.longitude = req.body.longitude;
	zone.latitude = req.body.latitude;
	zone.name = req.body.name;
  zone.desc = req.body.desc;
  zone.lastCommentText = req.body.lastCommentText;
  zone.lastCommentDate = req.body.lastCommentDate;
  zone.lastCommentUser_id = req.body.lastCommentUser_id;

    zone.save(function(err) {
      if(!err) {
  	console.log('Updated');
      } else {
  	console.log('ERROR: ' + err);
      }
      res.send(zone);
    });
  });
}

//DELETE - Delete a zone with specified ID
deleteZone = function(req, res) {
  Zone.findById(req.params.id, function(err, zone) {
    zone.remove(function(err) {
      if(!err) {
  	console.log('Removed');
      } else {
  	console.log('ERROR: ' + err);
      }
    })
  });
}



//PUT - Insert comment in a zone
addCommentToZone = function(req, res){
  Zone.findById (req.params.id, function(err, zone){
    
    
    //add comment to comments in zone
    zone.comments.push({
      text : req.body.text,
      date: req.body.date,//new Date(),
      user_id : req.body.user_id
    });

    //update last comment in zone
    zone.lastCommentText = req.body.text;
    zone.lastCommentDate = req.body.date;
    zone.lastCommentUser_id = req.body.user_id;

    zone.save(function(err) {
      if(!err) {
    console.log('Last comment updated, comment inserted in zone');
      } else {
    console.log('ERROR: ' + err);
      }
      res.send(zone);
    });

   
   
    /*zone.save(function(err1) {
      if(!err1) {
        console.log('Comment inserted in zone');
      } else {
        console.log('ERROR insering comment: ' + err1);
      }
      res.send(zone);
    });*/

  });
}


//POST - Return all zones in the area
  findAllZonesInArea = function(req, res){

  Zone.find({

    $and:
    [

    {
      $and:[{latitude : {$gte : Number(req.body.latitudeis)}},
          {latitude : {$lte : Number(req.body.latitudedi)}}]

    },
    {
      $and:[{longitude : {$gte : Number(req.body.longitudeis)}},
          {longitude : {$lte : Number(req.body.longitudedi)}}]
    }
    
    ]        

             }
             ,{latitude:1,longitude:1,name:1,desc:1,lastCommentText:1,lastCommentDate:1,lastCommentUser_id:1}
             , function(err, zonesInArea){
                if(!err) {
                  console.log(zonesInArea);
                  res.send(zonesInArea);
                } else {
                  console.log('ERROR: ' + err + req.body.latitudeis);
                }
             })
  }

//GET - Return the comments of a zone
findAllCommentsInZone = function(req, res){

  Zone.findById (req.params.id,
    //['comments'],
    //{ sort : { date : 1} },
    function(err, zone){
     if(!err) {
      //commentsInZone
      
      //var commentsInZone = zone.find(['comments']);
     //commentsInZone.sort('date', 1);
      //res.send(commentsInZone);
      /*zone.find(function(err, commentsInZone) {
        if(!err) {
          
          //res.send(zones);
        } else {
          console.log('ERROR: ' + err);
        }
      });*/

      res.send(zone.comments);
    } else {
      console.log('ERROR: ' + err);
    }
  });
}

//Link routes and functions
app.get('/zones', findAllZones);
app.get('/zone/:id', findById);
app.post('/zone', addZone);
app.put('/zone/:id', updateZone);

app.put('/zone/:id/comment', addCommentToZone);

app.post('/zonesinarea', findAllZonesInArea);

app.get('/commentsinzone/:id', findAllCommentsInZone);

app.delete('/zone/:id', deleteZone);
}