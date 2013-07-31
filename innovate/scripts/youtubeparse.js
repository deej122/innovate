exports.linkParse = function(url) {
	var y = url.search('watch');
	if(y != -1){
		var yes = url.substring(url.search('v=')+2); 
	} else {
		var yes = url.substring(url.search('be')+3)
	}
	var src = "//www.youtube.com/embed/"+yes+"?rel=0";
	return src;
}

exports.commaParse = function(string){
	var field = string.split(/,/);
	var tags = [];
	for(var i = 0; i < field.length; ++i){
		tags.push(field[i]);
	}
	return tags;
}