var db = require('mongojs').connect('innovate', ["users"]);
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

exports.addUser = addUser;
exports.getUser = getUser;