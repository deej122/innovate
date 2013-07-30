var url = "http://www.youtube.com/watch?v=7AjD7nKiUQ4";
var newurl = "http://youtu.be/7AjD7nKiUQ4";
var y = url.search('watch');
if(y != -1){
	var yes = url.substring(url.search('v=')+2); 
	console.log(yes);
} else {
	var yes = newurl.substring(url.search('be'))
	console.log(yes);
}

var src = "//www.youtube.com/embed/"+yes+"?rel=0";
console.log(src);