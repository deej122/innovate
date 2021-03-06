var forever = require('forever-monitor');

var child = new(forever.Monitor)('app.js',{
	max: 500,
	silent: false,
	watch: true,
	killTree: true,
	watchIgnoreDotFiles: null,
	watchIgnorePatterns: null,
	watchDirectory: __dirname,
	options: [] //watch = true?,
});

child.on('exit', function(){
	console.log('app.js has exited after 3 restarts');
});

child.on('restart', function(){
	console.log("restarted the server.");
})


child.start();