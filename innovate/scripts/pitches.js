$(document).ready(function(){
	$('.projectName').click(function(){
		var id = $(this).attr('data-id');
		$.ajax({
			url: '/displayProject',
			type: 'POST',
			cache: false,
			data: {id: id},
			success: function(data){
				if(data.msg == "ok"){
					$('#nameBig').text(data.name);
					$('#logoBig').attr('src', data.img);
					data.members.forEach(function(member){
						$('#teamBig').append("<li>"+member+"</li>");
					});
					data.tags.forEach(function(tag){
						$('#tagsBig').append("<li>"+tag+"</li>");
					});
					$('#youtubeLink').attr('src', data.link);
					$('#pDescription').text(data.description);
					$('#projectInfo').modal('show');
				} else{
					alert("There was an error.");
				}
			}
		});
	});
	$('.join').click(function(){
		var id = $(this).attr('data-id');
		alert(id);
		$.ajax({
			url:'/joinProject',
			type: 'POST',
			cache: false,
			data: {id: id},
			success : function(data){
				//be successful
				if(typeof(data.redirect == 'string')){
					window.location = data.redirect;
				}
			}
		})
	});
});