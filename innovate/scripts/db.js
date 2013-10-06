var db = require('mongojs').connect('innovate', ["users", "profiles", "projects", "schools", "codes"]);
var bcrypt = require('bcrypt-nodejs');
var env = process.env.NODE_ENV || 'development';

var addUser = function(userObject, callback){
	db.users.findOne({_id: userObject._id}, function(e, user){
		if(e) console.log(e);
		if(user){
			callback(0);
		} else{
			bcrypt.genSalt(10, function(err, salt){
				bcrypt.hash(userObject.pass, salt, null, function(err, hash){
					userObject.pass = hash;
					db.users.save(userObject);
					callback(1);
				});
			});
		}
	});
}

var getUser = function(email, password, callback){
	db.users.findOne({_id: email}, function(e, user){
		if(e) console.log(e);
		if(user){
			bcrypt.compare(password, user.pass, function(e, good){
				if(good){
					callback(1, user);
				} else{
					callback(0);
				}
			});
		} else{
			callback(2);
		}
	});
}

var getProfile = function(userObject, callback){
	db.profiles.findOne({_id: userObject._id}, function(e, profile){
		if(e) console.log(e);
		if(profile){
			callback(1, profile);
		} else {
			callback(0);
		}
	});
}

var addProfile = function(postData, callback){
	db.profiles.save(postData, function(e, good){
		if(e) {
			console.log(e); console.log(e.stack); callback(0);
		}
		else callback(1);
	});
}

var addProject = function(postData, callback){
	db.projects.save(postData, function(e, good){
		if(e) callback(0);
		else callback(1, good);
	})
};

var getProject = function(id, callback){
	db.projects.findOne({ members : id}, function(e, o){
		if(e) callback(0);
		if(o){
			callback(1, o);
		} else {
			callback(0);
		}
	})
}

var getProjById = function(id, callback){
	db.projects.findOne({_id: id}, function(e, o){
		if(e) callback(0);
		if(!o){
			callback(0);
		} else{
			callback(1, o);
		}
	})
}

var pullMember = function(userObject, callback){
	db.projects.update({members: userObject._id}, {$pull: {members: userObject._id}}, function(e, o){
		if(e) callback(0);
		else callback(1);
	});
}

var pushMember = function(userObject, callback){
		
}

var getAll = function(callback){
	db.projects.find(function(e, o){
		if(e) callback(0);
		else callback(1, o);
	});
}

var goalLength = function(id){
	var number = 0;
	function returnNumber(){
		return number;
	}
	db.projects.findOne({members: id}, function(e, o){
		if(o.goals == undefined){
			return returnNumber;
		}
		else if(o.goals.length == 0){
			number = o.goals.length;
			return returnNumber;
		} else{
			for(var i = 0; i < o.goals.length; ++i){
				number = o.goals[i];
			}
			console.log(number);
			return returnNumber;
		}
	});
}

var addGoal = function(id, goalData, callback){
	db.projects.update({members: id}, {$push: {goals: goalData}}, function(e, o){
		if(e) callback(0);
		else{
			callback(1);
		}
	});
}

var removeGoal = function(id, goalId, callback){
	db.projects.update({members: id}, {$pull: {goals: {id: goalId}}}, function(e, o){
		if(e) callback(0);
		else callback(1);
	});
}

var finishGoal = function(id, goalId, goalData, callback){
	removeGoal(id, goalId, function(good){
		console.log("This is the remove goal of:" , good);
		if(good){
			addGoal(id, goalData, function(great){
				if(great) callback(1);
				else callback(0);
			})
		}
	})
}

var findSchool = function(id, schoolId, callback){
	db.codes.findOne({_id: id}, function(e, o){
		if(o){
			var flag = false;
			o.codes.forEach(function(code){
				if(code == schoolId){
					flag = true;
				}
			});
			if(flag){
				callback(1);
			} else{
				callback(0);
			}
		} else{
			callback(0);
		}
	});
}

var joinProject = function(id, email, callback){
	db.projects.update({_id: id}, {$push: {members: email}}, function(e, o){
		if(!e) callback(1);
		else callback(0);
	})
}

exports.addUser = addUser;
exports.getUser = getUser;
exports.getProfile = getProfile;
exports.addProfile = addProfile;
exports.addProject = addProject;
exports.getProject = getProject;
exports.joinProject = joinProject;
exports.pullMember = pullMember;
exports.pushMember = pushMember;
exports.getAll = getAll;
exports.getProjById = getProjById;
exports.addGoal = addGoal;
exports.removeGoal = removeGoal;
exports.goalLength = goalLength;
exports.findSchool = findSchool;
exports.finishGoal = finishGoal;