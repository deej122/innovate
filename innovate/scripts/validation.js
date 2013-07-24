var validateSignup = function(obj){
	var errors = [];
	if(obj.firstName == ""){
		errors.push("You must enter a first name!");
	}
	if(obj.lastName == ""){
		errors.push("You must enter a last name!");
	}
	
}