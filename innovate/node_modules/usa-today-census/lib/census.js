/*
Copyright (c) 2013 ICRL

See the file license.txt for copying permission.
*/

var http = require('http'),
	url = require('url'),
	_ = require('underscore'),
	config = require('../config.js');

//http://api.usatoday.com/open/census?api_key=XXXXXX

var Census = function(key, options){
	if(!options) options = {}; //if options do not exist, make an object for them
	options = _.defaults(options,{ //default options to fill in the gaps, not documented, user 
		format: 'json', //should not know lol
		host: 'api.usatoday.com',
		path: '/open/census'
	});
	this.config = {
		key: key,
		format: options.format,
		host: options.host,
		path: options.path
	};
	return this;
};

Census.prototype.get = function(options, callback){
	//make the http request as per specific options
	//default options if they do not exist
	//send back the JSON in the callback
	if(!options) options = {};
	options = _.defaults(options, { //default for any options
		keypat: 'Detroit city',
		keyname: 'placename',
		sumlevid: '4,6',
		call: 'loc'
	});
	var url = this._generateUrl(options);
	this._makeRequest(url, callback);

}

Census.prototype._makeRequest = function(url, callback){
	http.get(url, function(res){
		var data = [];
		res.on('data', function(chunk){
			data.push(chunk);
		})
		.on('end', function(){
			var response;
			var dataBuff = data.join('').trim();
			try{
				response = JSON.parse(dataBuff).response;
			} catch(exp){
				response = {status: 500, message: exp + ' JSON parse error'}
			}
			callback(null, response);
		})
		.on('error', function(e){
			callback(e);
		});
	});
}

Census.prototype._generateUrl = function(query){
	query.api_key = this.config.key;
	return url.format({
		protocol: 'http',
		hostname: this.config.host,
		pathname: this.config.path + '/loc',
		query: query
	});
};

module.exports = Census;