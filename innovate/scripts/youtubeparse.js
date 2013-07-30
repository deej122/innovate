exports.parse = function(url) {
	var y = url.search('watch');
	if(y != -1){
		var yes = url.substring(url.search('v=')+2); 
	} else {
		var yes = url.substring(url.search('be'))
	}
	var src = "//www.youtube.com/embed/"+yes+"?rel=0";
	return src;
}
