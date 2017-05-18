//------------------Business Logic------------------//
//song array
//songs[0] - forget about dre
//songs[1] - one night
var songs = ["https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/269583066&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true", "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/290593608&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"];

//healing option to add health to a weak character
var formaldehyde = {
  healthUp: 100,
};
//Player Constructor
function Player(name) {
  this.name = name;
  this.life = 100;
  this.physical = 10;
  this.magic = 8;
  this.item = [formaldehyde];
}

//array containing enemy names
var enemies = ["ally", "angel cat", "deer", "lobstrosity", "steampunk mongoose", "turkerus"];
//array containing corresponding enemy image locations
var enemyImages = ["ally(-)_burned.png", "angel-cat_burned.png", "deer-ally_burned.png", "lobstrosity_burned.png", "steampunk-mongoose_burned.png", "turkerus_burned.png"];
// //array containing corresponding enemy items
// var enemyItems = ["crabItem", "mongooseItem", "squirrelItem", "chickenItem", "turkeyItem"];
// //array containing corresponding enemy attacks
// var enemyAttacks = ["crabAttack", "mongooseAttack", "squirrelAttack", "chickenAttack", "turkeyAttack"];

//constructor for enemy
function Enemy(input) {
this.name = enemies[input];
this.life = 100;
this.physical = Math.floor(Math.random()*5 + 8);
this.magic = Math.floor(Math.random()*5 + 8);
// this.item = enemyItems[input];
// this.attack = enemyAttacks[input];
this.image = enemyImages[input];
}


//Player Attack Prototype
Player.prototype.playerAttack = function(input) {
  var roll = [0, 5, 10];
  var rollNumber = Math.floor(Math.random()*2);
  input.life -= (this.physical + roll[rollNumber]);
}

//Enemy Attack Prototype
Enemy.prototype.enemyAttack = function(input) {
  var roll = [0, 5, 10];
  var rollNumber = Math.floor(Math.random()*2);
  input.life -= (this.physical + roll[rollNumber]);
}
//Cast Prototype
Player.prototype.cast = function(life, magic) {

  this.life -= this.life - this.magic;
}
  //heal prototype that heals character
Player.prototype.heal = function() {
  if (this.life < 100) {
    this.life = 100;
  }
}
//Array that allows access to Castle after defeating all locations
var castleCounter = 0;
// alert("fire5");
var Boss = {
  name: "Vlad",
  life: 100,
  physical : Math.floor(Math.random()*4 + 8),
  magic : Math.floor(Math.random()*4 + 8),
  image : "boss_burned.png"
};

 //------------------User Interface Logic------------------//
$(function(){
  $("body").append('<iframe width="0px;" height="0px;" scrolling="no" frameborder="no" src="' + songs[1] + '"></iframe>');
    $("#raiseCol").fadeIn(6000);
    $("#bardTale").fadeIn(6000);

  $("#gameStart").click(function(event) {
    event.preventDefault();
    $("#titleScreenContainer").hide();
    $("#startContainer").show();
  });

  $("#startButton").click(function(event){
    event.preventDefault();
    $("#startContainer").hide();
    $("#characterContainer").show();
  });

  //click button takes user to map
  $("#formCharacter").submit(function(event){
    event.preventDefault();
    $("body").append('<iframe width="0px;" height="0px;" scrolling="no" frameborder="no" src="' + songs[0] + '"></iframe>');
    $("#characterContainer").hide();
    $("#mapContainer").show();
    $("#dre").show();
    var characterChoice = $("input:radio:checked").val();
    var userPlayer = new Player(characterChoice);

//--------Locations----------//
    //Ghost House Location
    $("#ghostHouse").click(function(event) {
      event.preventDefault();
      $("#mapContainer").hide();
      $("#locationContainer").show();
      $("#hauntedContainer").show();
      $("#attackHaunted").show();
      $(".escape").show();
      $("#hauntedTitle").show();

      if(userPlayer.name === "Tex") {
        $(".Tex").show();
      }
      else if(userPlayer.name === "Tinks") {
        $(".Tinks").show();
      }
      else if(userPlayer.name === "Ned") {
        $(".Ned").show();
      }
      else if(userPlayer.name === "Stunner") {
        $(".Stunner").show();
      }
      //if-statement that generates a random enemy on first visit to location and prevents generating another random enemy on subsequent visits
      if ($("#hauntedEnemyAppear").children().length < 1) {
        //store random number between 0 and the current length of the enemies array to select an enemy character
        var position = Math.floor(Math.random()*enemies.length);
        //create constructor for randomly selected enemy character
        var newEnemy = new Enemy(position);
        //remove randomly selected enemy and corresonding image from arrays to prevent being selected again
        enemies.splice(position, 1);
        enemyImages.splice(position, 1);
        $("#hauntedEnemyAppear").append('<img class="enemyStyle" src="images/' + newEnemy.image + '" alt=""/>');

      }

      //Attack Sequence
      $("#attackHaunted").on("click", function() {
        userPlayer.playerAttack(newEnemy);
        console.log("Player Attack - Player:",userPlayer);
        console.log("Player Attack - Enemey:",newEnemy);
        if (newEnemy.life > 0) {
          setTimeout(function() {
            newEnemy.enemyAttack(userPlayer);
            console.log("Enemy Attack - Player:",userPlayer);
            console.log("Enemy Attack - Enemey:",newEnemy);
          }, 1500);
          if (userPlayer.life <= 0) {
            alert("you died lol what a loser!!");
            // location.reload();
          }
        }
        else {
          alert("congrats on killing something.");
          setTimeout(function(){userPlayer.heal();}, 2000);
          $("#attackHaunted").hide();
          castleCounter += 1;
        }
      });

    });
    //Village Location
    $("#village").click(function(event) {
      event.preventDefault();
      $("#mapContainer").hide();
      $("#locationContainer").show();
      $("#villageContainer").show();
      $("#attackVillage").show();
      $(".escape").show();
      $("#villageTitle").show();

      if(userPlayer.name === "Tinks") {
        $(".Tinks").show();
      }
      else if(userPlayer.name === "Tex") {
        $(".Tex").show();
      }
      else if(userPlayer.name === "Ned") {
        $(".Ned").show();
      }
      else if(userPlayer.name === "Stunner") {
        $(".Stunner").show();
      }

      //if-statement that generates a random enemy on first visit to location and prevents generating another random enemy on subsequent visits
      if ($("#villageEnemyAppear").children().length < 1) {
        //store random number between 0 and the current length of the enemies array to select an enemy character
        var position = Math.floor(Math.random()*enemies.length);
        //create constructor for randomly selected enemy character
        var newEnemy = new Enemy(position);
        //remove randomly selected enemy and corresonding image from arrays to prevent being selected again
        enemies.splice(position, 1);
        enemyImages.splice(position, 1);
        $("#villageEnemyAppear").append('<img class="enemyStyle" src="images/' + newEnemy.image + '" alt=""/>');
      }

      //Attack Sequence
      $("#attackVillage").on("click", function() {
        userPlayer.playerAttack(newEnemy);
        console.log("Player Attack - Player:",userPlayer);
        console.log("Player Attack - Enemey:",newEnemy);
        if (newEnemy.life > 0) {
          setTimeout(function() {
            newEnemy.enemyAttack(userPlayer);
            console.log("Enemy Attack - Player:",userPlayer);
            console.log("Enemy Attack - Enemey:",newEnemy);
          }, 1500);
          if (userPlayer.life <= 0) {
            alert("you died lol what a loser!!");
            // location.reload();
          }
        }
        else {
          alert("Dang, you won. It was a rather weak opponent so you shouldn't feel too proud of yourself.");
          setTimeout(function(){userPlayer.heal();}, 2000);
          $("#attackVillage").hide();
          castleCounter += 1;
        }
      });

    });
    //Swamp Location
    $("#houseOverWater").click(function() {
      $("#mapContainer").hide();
      $("#locationContainer").show();
      $("#attackSwamp").show();
      $(".escape").show();
      $("#swampContainer").show();
      $("#swampTitle").show();

      if(userPlayer.name === "Tinks") {
        $(".Tinks").show();
      }
      else if(userPlayer.name === "Tex") {
        $(".Tex").show();
      }
      else if(userPlayer.name === "Ned") {
        $(".Ned").show();
      }
      else if(userPlayer.name === "Stunner") {
        $(".Stunner").show();
      }

      //if-statement that generates a random enemy on first visit to location and prevents generating another random enemy on subsequent visits
      if ($("#swampEnemyAppear").children().length < 1) {
        //store random number between 0 and the current length of the enemies array to select an enemy character
        var position = Math.floor(Math.random()*enemies.length);
        //create constructor for randomly selected enemy character
        var newEnemy = new Enemy(position);
        //remove randomly selected enemy and corresonding image from arrays to prevent being selected again
        enemies.splice(position, 1);
        enemyImages.splice(position, 1);
        $("#swampEnemyAppear").append('<img class="enemyStyle" src="images/' + newEnemy.image + '" alt=""/>');
      }

      //Attack Sequence
      $("#attackSwamp").on("click", function() {
        userPlayer.playerAttack(newEnemy);
        console.log("Player Attack - Player:",userPlayer);
        console.log("Player Attack - Enemey:",newEnemy);
        if (newEnemy.life > 0) {
          setTimeout(function() {
            newEnemy.enemyAttack(userPlayer);
            console.log("Enemy Attack - Player:",userPlayer);
            console.log("Enemy Attack - Enemey:",newEnemy);
          }, 1500);
          if (userPlayer.life <= 0) {
            alert("you died lol what a loser!!");
            // location.reload();
          }
        }
        else {
          alert("You actually did something for once in your life.");
          setTimeout(function(){userPlayer.heal();}, 2000);
          $("#attackSwamp").hide();
          castleCounter += 1;
        }
      });

    });
    //Boat Location
    $("#boat").click(function(event) {
        $("#mapContainer").hide();
        $("#locationContainer").show();
        $("#boatContainer").show();
        $(".escape").show();
        $("#boatTitle").show();

        if(userPlayer.name === "Tinks") {
          $(".Tinks").show();
        }
        else if(userPlayer.name === "Tex") {
          $(".Tex").show();
        }
        else if(userPlayer.name === "Ned") {
          $(".Ned").show();
        }
        else if(userPlayer.name === "Stunner") {
          $(".Stunner").show();
        }

    });
    //Tower Location
    $("#tower").click(function(event) {
      event.preventDefault();
      $("#towerButton").hide();
      $("#mapContainer").hide();
      $("#locationContainer").show();
      $("#towerContainer").show();
      $("#attackTower").show();
      $(".escape").show();
      $("#towerTitle").show();

      if(userPlayer.name === "Tinks") {
        $(".Tinks").show();
      }
      if(userPlayer.name === "Tex") {
        $(".Tex").show();
      }
      if(userPlayer.name === "Ned") {
        $(".Ned").show();
      }
      if(userPlayer.name === "Stunner") {
        $(".Stunner").show();
      }

      //if-statement that generates a random enemy on first visit to location and prevents generating another random enemy on subsequent visits
      if ($("#towerEnemyAppear").children().length < 1) {
        //store random number between 0 and the current length of the enemies array to select an enemy character
        var position = Math.floor(Math.random()*enemies.length);
        //create constructor for randomly selected enemy character
        var newEnemy = new Enemy(position);
        //remove randomly selected enemy and corresonding image from arrays to prevent being selected again
        enemies.splice(position, 1);
        enemyImages.splice(position, 1);
        $("#towerEnemyAppear").append('<img class="enemyStyle" src="images/' + newEnemy.image + '" alt=""/>');
      }

      //Attack Sequence
      $("#attackTower").on("click", function() {
        userPlayer.playerAttack(newEnemy);
        console.log("Player Attack - Player:",userPlayer);
        console.log("Player Attack - Enemey:",newEnemy);
        if (newEnemy.life > 0) {
          setTimeout(function() {
            newEnemy.enemyAttack(userPlayer);
          }, 1500);
          console.log("Enemy Attack - Player:",userPlayer);
          console.log("Enemy Attack - Enemey:",newEnemy);
          if (userPlayer.life <= 0) {
            alert("you died lol what a loser!!!");
            // location.reload();
          }
        }
        else {
          alert("Wow. You killed something. Good job, I guess.");
          setTimeout(function(){userPlayer.heal();}, 2000);
          $("#attackTower").hide();
          castleCounter += 1;
        }
      });

    });
    //UFO Location
    $("#ufo").click(function(event) {
      event.preventDefault();
      $("#mapContainer").hide();
      $("#locationContainer").show();
      $("#trailerContainer").show();
      $("#attackTrailer").show();
      $(".escape").show();
      $("#trailerTitle").show();

      if(userPlayer.name === "Tinks") {
        $(".Tinks").show();
      }
      if(userPlayer.name === "Tex") {
        $(".Tex").show();
      }
      if(userPlayer.name === "Ned") {
        $(".Ned").show();
      }
      if(userPlayer.name === "Stunner") {
        $(".Stunner").show();
      }

      //if-statement that generates a random enemy on first visit to location and prevents generating another random enemy on subsequent visits
      if ($("#trailerEnemyAppear").children().length < 1) {
        //store random number between 0 and the current length of the enemies array to select an enemy character
        var position = Math.floor(Math.random()*enemies.length);
        //create constructor for randomly selected enemy character
        var newEnemy = new Enemy(position);
        //remove randomly selected enemy and corresonding image from arrays to prevent being selected again
        enemies.splice(position, 1);
        enemyImages.splice(position, 1);
        $("#trailerEnemyAppear").append('<img class="enemyStyle" src="images/' + newEnemy.image + '" alt=""/>');
      }

      //Attack Sequence
      $("#attackTrailer").on("click", function() {
        userPlayer.playerAttack(newEnemy);
        console.log("Player Attack - Player:",userPlayer);
        console.log("Player Attack - Enemey:",newEnemy);
        if (newEnemy.life > 0) {
          setTimeout(function() {
            newEnemy.enemyAttack(userPlayer);
          }, 1500);
          console.log("Enemy Attack - Player:",userPlayer);
          console.log("Enemy Attack - Enemey:",newEnemy);
          if (userPlayer.life <= 0) {
            alert("you died lol what a loser!!");
            // location.reload();
          }
        }
        else {
          alert("OMG! Look what you've done! What a terrible person you are!");
          setTimeout(function(){userPlayer.heal();}, 2000);
          $("#attackTrailer").hide();
          castleCounter += 1;
        }
      });

    });
    //Castle Location
    $("#oceanCastle").click(function() {
      event.preventDefault();
      $("#mapContainer").hide();
      $("#locationContainer").show();
      $("#castleContainer").show();
      $(".escape").show();
      $("#castleTitle").show();

      if(userPlayer.name === "Tinks") {
        $(".Tinks").show();
      }
      if(userPlayer.name === "Tex") {
        $(".Tex").show();
      }
      if(userPlayer.name === "Ned") {
        $(".Ned").show();
      }
      if(userPlayer.name === "Stunner") {
        $(".Stunner").show();
      }

      if (castleCounter === 5) {
        $("#attackCastle").show();
        //if-statement that generates a random enemy on first visit to location and prevents generating another random enemy on subsequent visits
        if ($("#castleEnemyAppear").children().length < 1) {
          //store random number between 0 and the current length of the enemies array to select an enemy character
          var position = Math.floor(Math.random()*enemies.length);
          //create constructor for randomly selected enemy character
          var newEnemy = new Enemy(position);
          //remove randomly selected enemy and corresonding image from arrays to prevent being selected again
          enemies.splice(position, 1);
          enemyImages.splice(position, 1);
          $("#castleEnemyAppear").append('<img class="enemyStyle" src="images/' + newEnemy.image + '" alt=""/>');
        }

        //Attack Sequence
        $("#attackCastle").on("click", function() {
          userPlayer.playerAttack(newEnemy);
          console.log("Player Attack - Player:",userPlayer);
          console.log("Player Attack - Enemey:",newEnemy);
          if (newEnemy.life > 0) {
            setTimeout(function() {
              newEnemy.enemyAttack(userPlayer);
            }, 1500);
            console.log("Enemy Attack - Player:",userPlayer);
            console.log("Enemy Attack - Enemey:",newEnemy);
            if (userPlayer.life <= 0) {
              alert("you died lol what a loser!!");
              // location.reload();
            }
          }
          else {
            alert("Wow. You killed someone's pet. Hope you feel good about yourself.");
            setTimeout(function(){userPlayer.heal();}, 2000);
            $("#attackCastle").hide();
            castleCounter += 1;
            $("#throneRoom").show();
          }
        });
      }
    });
    //throne room Button
    $("#throneRoom").click(function(event) {
      event.preventDefault();
      $("#castleContainer").hide();
      $("#throneContainer").show();
      $("#throneRoom").hide();
      $(".escape").show();
      $(".locTitle").hide();
      $("#throneTitle").show();

      if(userPlayer.name === "Tinks") {
        $(".Tinks").show();
      }
      if(userPlayer.name === "Tex") {
        $(".Tex").show();
      }
      if(userPlayer.name === "Ned") {
        $(".Ned").show();
      }
      if(userPlayer.name === "Stunner") {
        $(".Stunner").show();
      }

      if (castleCounter === 6) {
        $("#attackThrone").show();
        //if-statement that generates a random enemy on first visit to location and prevents generating another random enemy on subsequent visits
        if ($("#throneRoomEnemyAppear").children().length < 1) {
          $("#throneRoomEnemyAppear").append('<img class="bossStyle" src="images/' + Boss.image + '" alt=""/>');
        }

        //Attack Sequence
        $("#attackThrone").on("click", function() {
          userPlayer.playerAttack(Boss);
          console.log("Player Attack - Player:",userPlayer);
          console.log("Player Attack - Enemey:",Boss);
          if (Boss.life > 0) {
            setTimeout(function() {
              Boss.enemyAttack(userPlayer);
            }, 1500);
            console.log("Enemy Attack - Player:",userPlayer);
            console.log("Enemy Attack - Enemey:",Boss);
            if (userPlayer.life <= 0) {
              alert("you died lol");
              // location.reload();
            }
          }
          else {
            alert("Congrats! You killed the boss....you MURDERER!!!!");
            setTimeout(function(){userPlayer.heal();}, 2000);
            $("#attackThrone").hide();

          }
        });
      }

    });
    //escape to Map Button
    $(".escape").click(function(event) {
      event.preventDefault();
      $("body").prepend('<iframe width="0px;" height="0px;" scrolling="no" frameborder="no" src="' + songs[0] + '"></iframe>');
      $(".locationHide").hide();
      $("#locationContainer").hide();
      $("#mapContainer").show();
      $(".locTitle").hide();
      $(".attack").hide();

    });


  });
});
// alert("fire10");
