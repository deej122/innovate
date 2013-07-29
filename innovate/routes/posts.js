var db = require('../scripts/db');
var s3 = require('../scripts/s3');
var ObjectID = require("mongodb").ObjectID;

exports.addUser = function(req, res){
	var userObj = {
		_id		: req.body.email,
		name 	: req.body.firstName + " " + req.body.lastName,
		pass	: req.body.pass
	}
	db.addUser(userObj, function(save){
		if(save){
			req.session.user = userObj;
			res.send({msg: 'ok', redirect: '/create'});
		} else {
			res.send({msg: 'nok'});
		}
	})
}

exports.getUser = function(req, res){
	var email = req.body.email;
	var pass = req.body.password;
	db.getUser(email, pass, function(good, userObj){
		if(good == 1){
			req.session.user = userObj; 
			res.send({msg: 'ok', redirect: '/profile'});
		} else if(good == 0){
			res.send({msg: 'nok'});
		} else{
			res.send({msg: 'notfound'})
		}
	})
}

exports.addProfile = function(req, res){
	var postData = {
		_id    :  req.session.user._id,
		school	 : 	req.body.hsName,
		location : 	req.body.location
	}
	db.addProfile(postData, function(good){
		if(good){
			s3.picture(req, function(aok){
				if(aok){
					res.redirect('/profile');
				} else {
					res.send('There was an error. Try again.');
				}
			})
			//added to db, now upload the picture
		} else{
			res.send('There was an error.');
		}
	})
}

exports.addProject = function(req, res){
	var postData = {
		//var id = new ObjectID();
		_id 	    : 	id.valueOf().toString(),
		creator     :   req.session.user._id,
		name        :   req.body.projectName,
		tags        :   req.body.projectTags,
		youtube     :   req.body.projectPitchLink,
		missing     :   req.body.projectTeam,
		skills      :   req.body.projectSkills,
		description :   req.body.projectDescription,
		members     :   []
	}
	db.addProject(postData, function(good, project){
		if(good){
			s3.project(req, project._id, function(great){
				if(great){
					res.redirect('/profile');
				} else {
					res.send('There was ane error');
				}
			})
		} else {
			res.send('There was an error.');
		}
	})
}