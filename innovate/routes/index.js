
/*
 * GET home page.
 */
 
var db = require('../scripts/db.js');
var s3 = require('../scripts/s3.js');

exports.index = function(req, res){
  if(req.session.user != null){
  	res.redirect('/profile');
  } else {
  	res.render('landing', { title: 'innovate' });
  }
};

exports.home = function(req, res){
	if(req.session.user != null){
		res.redirect('/profile');
	} else {
		res.render('home', {title: 'Home'});
	}
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
				db.getProject(req.session.user._id, function(cool, project){
					if(cool){
						var proPic = s3.getPic(req.session.user._id);
						var url = s3.getProj(project._id);
						var data = {
							title: 'Profile',
							name : req.session.user.name,
							school : profile.school,
							location : profile.location,
							img : proPic,
							projectName: project.name,
							members: project.members,
							tags: project.tags,
							link: project.youtube,
							description: project.description,
							projImg: url,
						}
						res.render('profile', data);
					} else {
						var proPic = s3.getPic(req.session.user._id);
						var url = "grayLightBulb.png"; //some default ID
						var data = {
							title: 'Profile',
							name : req.session.user.name,
							school : profile.school,
							location : profile.location,
							img : proPic,
							projectName: "Looks like you're not working on any projects.",
							members: [],
							tags: [],
							link: "",//some default video about project cinta,
							description: "Click the links above to either create a project or join one! It's what the cool kids are doing.",
							projImg: url,
						}
						res.render('profile', data);
					}
				})
			} else{
				res.redirect('/create');
			}
		})
	}
};

exports.new = function(req, res){
	if(req.session.user == null){
		res.redirect('/');
	} else {
		res.render('new', {title: "Create a Campaign"});
	}
};

exports.pitches = function(req, res){
	db.getAll(function(good, pitches){
		if(good){
			res.render('pitches', {title: "Pitch You!", pitches: pitches});
		} else{
			res.send('not ok, refresh.');
		}
	})
};

exports.logout = function(req, res){
	req.session.destroy();
	res.redirect('/home');
}