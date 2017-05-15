//------------------Business Logic------------------//




//------------------User Interface Logic------------------//
$(function(){
    $("#bardTale").show(7000);
    $("#startButton").fadeIn(10000);

  $("#startButton").click(function(event){
    event.preventDefault();
    $("#startContainer").hide();
    $("#characterContainer").show();
  });

  $("#formCharacter").submit(function(event){
    event.preventDefault();
    $("#characterContainer").hide();
    $("#mapContainer").show();
  });



});
