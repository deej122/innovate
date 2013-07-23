var flash = require('connect-flash')
  , express = require('express')
  , engine = require('ejs-locals')
  , form  = require('express-form')
  , moment = require('moment') //hey omar what up
  , http = require('http')
  , ObjectID = require('mongodb').ObjectID
  , field = form.field 
  , passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , graph = require('fbgraph')
  , fs = require('fs')
  , db = require('mongojs').connect("innovate", ["profiles", "pitches", "users"]); 


  var AccountModule = require('./scripts/AccountModule.js').AccountModule;

  var accountModule = new AccountModule;

var app = express();
app.configure(function(){
	app.set('port', process.env.PORT || 8880);
	app.use(express.static(__dirname + '/stylesheets'));
	app.use(express.static(__dirname + '/images'));
	app.use(express.static(__dirname + '/scripts'));
  	app.use(express.methodOverride());
  	app.use(express.cookieParser());
  	app.use(express.bodyParser());
  	app.use(express.session({ secret: 'you-ll-never-guess-z' }));
  	app.use(passport.initialize());
  	app.use(passport.session());
  	app.engine('ejs', engine);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.engine('html', require('ejs').renderFile);
	app.use(express.favicon());  	
  	app.use(app.router);

	passport.serializeUser(function(user, done) {
  		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
  		User.findById(id, function(err, user) {
   			done(err, user);
  		});
	});			


});

app.listen(8880);

/*app.post('/login', function(req, res){
	accountModule.manualLogin(req.body.email, req.body.password, function(e, o){
		if(!o){
            res.send({error: "Error: Username and Password Combination don't match"});
		} else{
			req.session.user = o;
			if(req.body.rememberme == 'true'){
				res.cookie('email', o.email, {maxAge: 900000});
				res.cookie('pass', o.pass, {maxAge: 900000});
			}
		  res.send({redirect:'/profile'});
		}
	});
});*/

app.get('/', function(req, res){
 /*   if(req.session.user || req.user){
        res.redirect('/profile');
    }
	else */{
      res.render('home', {title: "Signup"});
  }
});

/*app.post('/', function(req, res){
    var objectId = new ObjectID();
    accountModule.addNewAccount({
        _id     : objectId.valueOf().toString(),
        name    : req.body.name,
        email   : req.body.email,
        pass    : req.body.password
    }, function(e, o, k){
        console.log(o);
        if (e){
            console.log(e);
            res.send({error: "Error: Username already exists"});
        }   else{
            req.session.user = o;
            res.send({redirect:'/create'});
       }
    });
});*/

app.get('/profile', function(req, res){
/*    if(req.session.user || req.user){
        res.redirect('/profile');
    }
	else */{
      res.render('profile', {title: "Profile"});
  }
});

app.get('/new', function(req, res){
/*    if(req.session.user || req.user){
        res.redirect('/profile');
    }
	else */{
      res.render('new', {title: "Profile"});
  }
});