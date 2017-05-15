//------------------Business Logic------------------//




//------------------User Interface Logic------------------//
$(function(){

  $("#backStoryColumn").click(function(event){
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
