var db = require('../scripts/db');

exports.addUser = function(req, res){
	var userObj = {
		_id		: req.body.email,
		name 	: req.body.firstName + " " + req.body.lastName,
		pass	: req.body.password
	}
	db.addUser(userObj, function(save){
		if(save){
			res.send({msg: 'ok'});
		} else {
			res.send({msg: 'nok'});
		}
	})
}

exports.getUser = function(req, res){
	var email = req.body.email;
	var pass = req.body.password;
	db.getUser(email, pass, function(good){
		if(good){
			res.send({msg: 'ok'});
		} else{
			res.send({msg: 'nok'});
		}
	})
}