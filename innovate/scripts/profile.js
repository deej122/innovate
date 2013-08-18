  $(document).ready(function(){
    $('#newProject').click(function(e){
      e.preventDefault();
      $.ajax({
        url: '/getProject',
        type: 'POST',
        cache: false,
        success: function(data){
          if(data.msg == 'no'){
            $('#areyousure').modal('show');
            //make modal appear with the painful text
          } else{
            $('#newProject').unbind('click');
            window.location = "/new";
          }
        }
      })
    });
    $('.goalCheck').click(function(){
      alert("hello!");
    })
    $('#goalSubmit').click(function(e){
      e.preventDefault();
      var goal = $('#newwGoal').val();
      if($('#goalForm')[0].checkValidity()){
        $.ajax({
        url: '/addGoal',
        type: 'POST',
        cache: false,
        data: {goal: goal},
        success: function(data){
          //do the adding goals here erghnuggets visually
          if(data.msg == 'ok'){
            //do the stuff with the data.msg
            html = '<li class = "goalRow"><span class = "goalName">'+goal+'</span>';
            html += '<span class = "goalCheck"><input type = "button" class = "buttonCheck" value = "&#10003;"></span>';
            html += '<span class = "goalEx"><input type = "button" class = "buttonEx" value = "&#10007;"></span></li>';

            $('#goalsInfo').append(html);
            $('#newwGoal').val("");
            $('#addGoal').modal('hide');
          } else{
            alert("There was an error. Please try again.");
          }
        }
      })
      } else{
        toastr.error('Please enter a goal.');
      }
    });
  })
    function showPort()
    {
      if ( document.getElementById('portfolioContent').style.display == "none" ) {
            document.getElementById('portfolioContent').style.display= "";
          } /*else {
            document.getElementById('portfolioContent').style.display = "";
          } */   

      if ( document.getElementById('progressContent').style.display == "" ) {
            document.getElementById('progressContent').style.display= "none";
          } /*else {
            document.getElementById('progressContent').style.display = "none";
          }   */  

      if ( document.getElementById('projectContent').style.display == "" ) {
            document.getElementById('projectContent').style.display= "none";
          } /*else {
            document.getElementById('progressContent').style.display = "none";
          }   */  

      if ( document.getElementById('navPort').style.color !== "#B452CD" ){
            document.getElementById('navPort').style.color == "#B452CD";
      }                                          

    }

    function showProj()
    {
 

      if ( document.getElementById('projectContent').style.display == "none" ) {
            document.getElementById('projectContent').style.display= "";
          } /*else {
            document.getElementById('portfolioContent').style.display = "";
          } */   

      if ( document.getElementById('progressContent').style.display == "" ) {
            document.getElementById('progressContent').style.display= "none";
          } /*else {
            document.getElementById('progressContent').style.display = "none";
          }   */  

      if ( document.getElementById('portfolioContent').style.display == "" ) {
            document.getElementById('portfolioContent').style.display= "none";
          } /*else {
            document.getElementById('progressContent').style.display = "none";
          }   */                                         
    }    

    function showProg()
    {
 

      if ( document.getElementById('progressContent').style.display == "none" ) {
            document.getElementById('progressContent').style.display= "";
          } /*else {
            document.getElementById('portfolioContent').style.display = "";
          } */   

      if ( document.getElementById('portfolioContent').style.display == "" ) {
            document.getElementById('portfolioContent').style.display= "none";
          } /*else {
            document.getElementById('progressContent').style.display = "none";
          }   */  

      if ( document.getElementById('projectContent').style.display == "" ) {
            document.getElementById('projectContent').style.display= "none";
          } /*else {
            document.getElementById('progressContent').style.display = "none";
          }   */                                         
    }    