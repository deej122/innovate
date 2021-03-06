$(document).ready(function(){
	$('#basicForm').submit(function(e){
		e.preventDefault();
	})
	$('#formSubmit').click(function(){
		var name = $('#projectName').val();
		var link = $('#pitchLink').val();
		var teammates = $('#teammates').val();
		var description = $('#description').val();
		var errors = [];
		if(name == ""){
			errors.push("You need to enter a project name!");
		} 
		if(link == ""){
			errors.push("You need to enter a link to your pitch!");
		}
		if(ytVidId(link) == false){
			errors.push("You need to enter a valid YouTube URL!");
		}
		if(teammates == ""){
			errors.push("You need to enter how many teammates you are looking for!");
		}
		if(description == ""){
			errors.push("You need to enter a description of your project!")
		}
		if(errors.length == 0){
			$('#basicForm').unbind("submit");
			$('#basicForm').submit();
		} else {
			$('#errorContent').empty();
        	for(var i = 0; i < errors.length; ++i){
            	$('#errorContent').append("<p>"+errors[i]+"</p>");
        	}
        	$('#errors').modal('show');
		}
	})
})

function ytVidId(url) {
  var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return (url.match(p)) ? RegExp.$1 : false;
}