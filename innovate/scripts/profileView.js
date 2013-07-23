    function showPort()
    {
 

      if ( document.getElementById('portfolioContent').style.display == "none" ) {
            document.getElementById('portfolioContent').style.display= "";
          } /*else {
            document.getElementById('portfolioContent').style.display = "";
          } */   

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

      if ( document.getElementById('portfolioContent').style.display == "" ) {
            document.getElementById('portfolioContent').style.display= "none";
          } /*else {
            document.getElementById('progressContent').style.display = "none";
          }   */                                         
    }  