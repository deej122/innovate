var db = require('../scripts/db');
var s3 = require('../scripts/s3');
var parser = require('../scripts/youtubeparse');
var ObjectID = require("mongodb").ObjectID;
var moment = require('moment');

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
		_id    	 :  req.session.user._id,
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
	var id = new ObjectID();
	var youtube = parser.linkParse(req.body.projectPitchLink);
	var tags = parser.commaParse(req.body.allTags);
	var postData = {
		_id 	    : 	id.valueOf().toString(),
		creator     :   req.session.user._id,
		name        :   req.body.projectName,
		tags        :   tags,
		youtube     :   youtube,
		missing     :   req.body.projectTeam,
		skills      :   req.body.projectSkills,
		description :   req.body.projectDescription,
		members     :   [req.session.user._id],
		date        :   moment().format('MMMM Do YYYY, h:mm:ss a'),
		status      :   "Active"
	}
	db.pullMember(req.session.user, function(fantastic){
		if(fantastic){
			db.addProject(postData, function(good, project){
				if(good){
					s3.project(req, postData._id, function(great){
						if(great){
							res.redirect('/profile');
						} else {
							res.send('There was an error');
						}
					})
				} else {
					res.send('There was an error.');
				}
			})
		} else {
			res.send('There was an error. Refresh and try again.');
		}
	})
}

exports.getProject = function(req, res){
	var id = req.session.user._id;
	db.getProject(id, function(good, project){
		if(good){
			res.send({msg: 'no'});
		} else{
			res.send({msg: 'ok'});
		}
	})
}

exports.joinProject = function(req, res){
	console.log("The post is happenning...");
	var projId = req.body.id;
	var id = req.session.user._id;
	db.pullMember(req.session.user, function(fantastic){
		if(fantastic){
			db.joinProject(projId, id, function(good){
				if(good) res.send({redirect: '/profile'});				
				else console.log('there was an error.');
			})
		}
	})
}

exports.getProjectById = function(req, res){
	var id = req.body.id;
	db.getProjById(id, function(good, project){
		if(!good){
			res.send({msg: "nok"});
		} else{
			var url = s3.getProj(id);
			var dataObj = {
				msg: "ok",
				name: project.name,
				description: project.description,
				tags: project.tags,
				members: project.members,
				link: project.youtube,
				img: url
			}
			res.send(dataObj);
		}
	});
}

exports.addGoal = function(req, res){
	var id = req.session.user._id;
	var goal = req.body.goal;
	var number = new ObjectID();
	var goalObject = {
		goal: goal,
		status: "unfinished",
		id: number.valueOf().toString()
	}
	db.addGoal(id, goalObject, function(good){
		if(good){
			res.send({msg: "ok", goalID: number.valueOf().toString()});
		} else{
			res.send({msg: "nok"});
		}
	})

}

exports.removeGoal = function(req, res){
	var id = req.session.user._id;
	var goalId = req.body.id;
	db.removeGoal(id, goalId, function(good){
		if(good){
			res.send({msg: 'ok', id: goalId});
		} else{
			res.send({msg: 'nok'});
		}
	})
}

exports.finishGoal = function(req, res){
	console.log("post being called...");
	var id = req.session.user._id;
	var goalId = req.body.id;
	var value = req.body.value;
	console.log("The goal to be finished is: ", value);
	var number = new ObjectID();
	var goalObject = {
		goal: value,
		status: "finished",
		id: number.valueOf().toString()
	}
	db.finishGoal(id, goalId, goalObject, function(good){
		if(good){
			res.send({msg: 'ok', goalID: number.valueOf().toString()});
		} else{
			res.send({msg: 'nok'});
		}
	})
}

exports.access = function(req, res){
	var code = req.body.code;
	db.findSchool(1, code, function(good){
		if(good){
			req.session.access = "granted";
			res.send({msg: 'ok', redirect: '/home'});
		} else{
			res.send({msg: 'nok'})
		}
	})
}