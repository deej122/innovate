var express = require('express')
  , routes = require('./routes')
  , posts = require('./routes/posts')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon(__dirname + '/images/favicon.ico'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser()); 
app.use(express.session({ secret: 'canttouchthisnananana'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/stylesheets'));
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/scripts'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/view', routes.view);
app.get('/', routes.index);
app.get('/home', routes.home);
app.get('/create', routes.create);
app.get('/profile', routes.profile);
app.get('/new', routes.new);
app.get('/pitches', routes.pitches);
app.get('/users', user.list);
app.get('/logout', routes.logout);

app.post('/signup', posts.addUser);
app.post('/login', posts.getUser);
app.post('/addProfile', posts.addProfile);
app.post('/getProject', posts.getProject);
app.post('/new', posts.addProject);
app.post('/displayProject', posts.getProjectById);
app.post('/addGoal', posts.addGoal);
app.post('/removeGoal', posts.removeGoal);
app.post('/finishGoal', posts.finishGoal);
app.post('/access', posts.access);
app.post('/joinProject', posts.joinProject);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
