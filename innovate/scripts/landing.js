$(document).ready(function(){
	$('#access_form').submit(function(e){
		e.preventDefault();
		var access_code = $('#access_code').val();
		$.ajax({
			url: '/access',
			type: 'POST',
			cache: false,
			data: {code: access_code},
			success: function(data){
				if(data.msg == 'ok'){
					window.location = data.redirect;
				} else{
					alert("That is not a recognized code. Try again!");
					$('#access_code').val('');
				}
			}
		})
	})
});