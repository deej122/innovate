
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('landing', { title: 'Signup' });
};

exports.home = function(req, res){
	res.render('home', {title: 'Home'})
};

exports.profile = function(req, res){
	res.render('profile', {title: "Profile"});
};

exports.new = function(req, res){
	res.render('new', {title: "Create a Campaign"});
};
