$(document).ready(function(){
  $('#joinForm').submit(function(e){
    return false;
  });
  $('#joinButton').click(function(e){
    var firstName = $('#first_name').val();
    var lastName = $('#last_name').val();
    var email = $('#email').val();
    var pass = $('#password').val();
    var passconfirm = $('#confirmPassword').val();
    var errors = validateSignup(firstName, lastName, email, pass, passconfirm);
    if(errors.length == 0){
      var dataObj = {
        firstName   : firstName,
        lastName    : lastName,
        email       : email,
        pass        : pass
      }
      $.ajax({
        url     :    '/signup',
        type    :    'POST',
        cache   :    false,
        data    :    dataObj,
        success :    function(data){
            if(data.msg == "nok"){
                //function to display that username is already taken
                $('#errorContent').empty();
                $('#errorContent').append("<p> That username is already taken!</p>")
                $('#errors').modal('show');
            } else {
                window.location = data.redirect;
            }
        }
      })
    } else{
        //display modal with errors
        $('#errorContent').empty();
        for(var i = 0; i < errors.length; ++i){
            $('#errorContent').append("<p>"+errors[i]+"</p>");
        }
        $('#errors').modal('show');
    }
  })
})

function forgotPass()
  {
    if ( document.getElementById('recover').style.display == "none" ) {
      document.getElementById('recover').style.display= "";
    } else {
      document.getElementById('recover').style.display = "none";
    }    

   if ( document.getElementById('enterForm').style.display == "" ) {
       document.getElementById('enterForm').style.display= "none";
   } else {
       document.getElementById('enterForm').style.display = "";
   }                                  
}

var validateSignup = function(firstName, lastName, email, pass, confirm){
  var errors = [];
  if(firstName == ""){
    errors.push("You must enter a first name!");
  }
  if(lastName == ""){
    errors.push("You must enter a last name!");
  }
  var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  if(!pattern.test(email)){
    errors.push("You must enter a valid email!");
  }
  if(pass !== confirm){
    errors.push("Passwords don't match!");
  }
  return errors; 
}