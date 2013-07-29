
/*
 * GET home page.
 */
 
var db = require('../scripts/db.js');
var s3 = require('../scripts/s3.js');

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
		db.getProfile(req.session.user, function(good, profile){
			if(good){
				var url = s3.getPic(req.session.user._id);
				var data = {
					title: 'Profile',
					name : req.session.user.name,
					school : profile.school,
					location : profile.location,
					img : url
				}	
				//db.getProject()
				res.render('profile', data);
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

exports.logout = function(req, res){
	req.session.destroy();
	res.redirect('/home');
}