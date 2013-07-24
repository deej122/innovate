
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , posts = require('./routes/posts')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/stylesheets'));
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/scripts'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/home', routes.home);
app.get('/profile', routes.profile);
app.get('/new', routes.new);
app.get('/users', user.list);

app.post('/signup', posts.addUser);
app.post('/login', posts.getUser);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
