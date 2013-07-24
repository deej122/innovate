var db = require('../scripts/db');

exports.addUser = function(req, res){
	var userObj = {
		_id		: req.body.email,
		name 	: req.body.firstName + " " + req.body.lastName,
		pass	: req.body.pass
	}
	db.addUser(userObj, function(save){
		if(save){
			req.session.user = userObj;
			res.send({msg: 'ok', redirect: '/'});
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
			res.send({msg: 'ok', redirect: '/'});
		} else if(good == 0){
			res.send({msg: 'nok'});
		} else{
			res.send({msg: 'notfound'})
		}
	})
}