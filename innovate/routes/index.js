
/*
 * GET home page.
 */
 
 exports.index = function(req, res){
  res.render('landing', { title: 'innovate' });
};

exports.home = function(req, res){
	res.render('home', {title: 'Home'});
};

exports.createProfile = function(req, res){
	res.render('createProfile', {title: "Create Profile"});
};

exports.profile = function(req, res){
	res.render('profile', {title: "Profile"});
};

exports.new = function(req, res){
	res.render('new', {title: "Create a Campaign"});
};

exports.pitches = function(req, res){
	res.render('pitches', {title: "Create a Campaign"});
};
