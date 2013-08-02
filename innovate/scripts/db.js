var db = require('mongojs').connect('innovate', ["users", "profiles", "projects"]);
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
			})
		}
	})
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

var pullMember = function(userObject, callback){
	db.projects.update({members: userObject._id}, {$pull: {members: userObject._id}}, function(e, o){
		if(e) callback(0);
		else callback(1);
	});
}

var pushMember = function(userObject, callback){
	
}

exports.addUser = addUser;
exports.getUser = getUser;
exports.getProfile = getProfile;
exports.addProfile = addProfile;
exports.addProject = addProject;
exports.getProject = getProject;
exports.pullMember = pullMember;