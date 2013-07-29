$(document).ready(function(){
	$('#createForm').submit(function(e){
		e.preventDefault();
	});
	$('#createSubmit').click(function(){
		var highschool = $('#highschool').val();
		var location = $('#location').val();
		var errors = [];
		if(highschool == ""){
			errors.push("You cannot leave your high school empty!");
		} 
		if(location == ""){
			errors.push("You cannot leave your location empty!");
		}
		if(errors.length == 0){
			$('#createForm').unbind("submit");
			$('#createForm').submit();
		} else {
			$('#errorContent').empty();
			for(var i = 0; i < errors.length; ++i){
				$('#errorContent').append("<p>"+errors[i]+"</p>");
			}
			$('#errors').modal('show');
		}
	});
});