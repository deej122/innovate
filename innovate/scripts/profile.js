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
    $('#goalSubmit').click(function(e){
      var goal = $('#newwGoal').val();
      e.preventDefault();
      $('#goalForm')[0].checkValidity();
      $.ajax({
        url: '/addGoal',
        type: 'POST',
        cache: false,
        data: {goal: goal},
        success: function(data){
          //do the adding goals here erghnuggets
          if(data.msg == 'ok'){
            //do the stuff with the data.msg
          } else{
            alert("There was an error. Please try again.");
          }
        }
      })
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