$(document).ready(function(){
	$('#basicForm').submit(function(e){
		return false;
	})
	$('#formSubmit').click(function(){
		var name = $('#projectName').val();
		var tag = $('#projectTags').val();
	})
})