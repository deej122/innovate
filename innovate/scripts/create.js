/*$(document).ready(function(){
	$('#createForm').submit(function(e){
		return false;
	});
	$('#createSubmit').click(function(){
		var highschool = $('#highschool').val();
		var location = $('#location').val();
		var form = $('createForm')[2];
		var fd = new FormData(form);
		var xhr = new XMLHttpRequest();
		xhr.open(form.method, form.action, true);
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				//handle success
				alert(msg);
			}
		};
		var data = {hsName: highschool, location: location, fd: fd};
		xhr.send(data);
		return false;
	})
});*/