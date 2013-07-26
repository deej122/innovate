
/*
 * GET home page.
 */
 
var db = require('../scripts/db.js');

exports.index = function(req, res){
  res.render('landing', { title: 'innovate' });
};

exports.home = function(req, res){
	res.render('home', {title: 'Home'});
};

exports.create = function(req, res){
	if(req.session.user == null){
		res.redirect('/home');
	} else {
		db.getProfile(req.session.user, function(good){
			if(good){
				res.redirect('/profile');
			} else{
				res.render('createProfile', {title: "Create Profile"});
			}
		})
	}
};

exports.profile = function(req, res){
	if(req.session.user == null){
		res.redirect('/home');
	} else{
		db.getProfile(req.session.user, function(good){
			if(good){
				res.render('profile', {title: "Profile"});
			} else{
				res.redirect('/create');
			}
		})
	}
};

exports.new = function(req, res){
	res.render('new', {title: "Create a Campaign"});
};

exports.pitches = function(req, res){
	res.render('pitches', {title: "Create a Campaign"});
};
