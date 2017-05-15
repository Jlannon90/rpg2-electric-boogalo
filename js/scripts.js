//------------------Business Logic------------------//




//------------------User Interface Logic------------------//
$(function(){
  $("#bardImage").fadeIn(6000);
    $("#raiseCol").fadeIn(6000);
    $("#bardTale").show(7000);

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
