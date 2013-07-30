var info = require('./info.js');
var fs = require('fs');
var s3 = require('s3policy');
var s3Account = new s3(info.access,info.secret);
var knox = require('knox');
var mpu = require('knox-mpu');

var client = knox.createClient({
	key		: 	info.access,
	secret  :   info.secret,
	bucket  :   info.bucket
});

var projectClient = knox.createClient({
	key     :   info.access,
	secret  :   info.secret,
	bucket  :   info.project
})
exports.picture = function(req, callback){
	if(req.files.picture.size == 0){
		var stream = fs.createReadStream('randopic');
	} else{
		var stream = fs.createReadStream(req.files.picture.path);
	}
	upload = new mpu(
		{
			client: client,
			objectName: req.session.user._id,
			stream: stream
		}, function(e, o){
			if(e) {
				callback(0);
			}
			else callback(1);
		}
	)
}

exports.getPic = function(email){
	return s3Account.readPolicy(email, info.bucket, 60);
}

exports.project = function(req, id, callback){
	if(req.files.picture.size == 0){
		var stream = fs.createReadStream('randopic');
	} else {
		var stream = fs.createReadStream(req.files.picture.path);
	}
	upload = new mpu(
		{
			client: projectClient,
			objectName: id,
			stream: stream

		}, function(e, o){
			if(e) callback(0);
			else callback(1);
		}
	)
}

exports.getProj = function(id){
	return s3Account.readPolicy(id, info.project, 60);
}