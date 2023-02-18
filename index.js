var btncolor = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var playerClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level" + level);
    nextSeq();
    started = true;
  }
});

$(document).keypress(function () {
  if (started) {
    $(".descriptions").remove();
  }
});

$(".btn").on("click", function () {
  var playerchose = $(this).attr("id");

  playerClickedPattern.push(playerchose);

  playSound(playerchose);

  animate(playerchose);

  check(playerClickedPattern.length - 1);
});

function check(currlev) {
  if (gamePattern[currlev] === playerClickedPattern[currlev]) {

    if (playerClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSeq();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").html("Game Over, Press Any Key To Restart");

    startOver();
  }
}

function nextSeq() {
  playerClickedPattern = [];

  level++;
  $("#level-title").text("Level" + level);

  var a = Math.floor(Math.random() * 4);
  var chosebtn = btncolor[a];
  gamePattern.push(chosebtn);

  $("#" + chosebtn)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(chosebtn);
}

function playSound(name) {
  var audior = new Audio("sounds/" + name + ".mp3");
  audior.play();
}

function animate(currbutt) {
  $("#" + currbutt).addClass("pressed");

  setTimeout(function () {
    $("#" + currbutt).removeClass("pressed");
  }, 100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}