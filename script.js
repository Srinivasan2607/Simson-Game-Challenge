var colors = ["green", 'red', 'yellow', 'blue'];
var List = [];
var choosen = [];

var level = 0;
var started = false;



$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }


}); 

$(".btn").click(function () {
    var choosencolour = $(this).attr("id");
    choosen.push(choosencolour);
    animateClick(choosencolour);
    playSound(choosencolour);

    checkAnswer(choosen.length - 1);

})


function checkAnswer(currentlevel) {
    if (List[currentlevel] === choosen[currentlevel]) {
        if (List.length === choosen.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        startOver();

        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);

        

    }
    
}

function nextSequence() {
    choosen = [];
    level++;
    $("#level-title").text("Level " + level);
    var rand = Math.floor(Math.random() * 4);
    var random = colors[rand];
    List.push(random);

    $("#" + random).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(random);
}

function animateClick(color) {
    $("." + color).addClass("pressed");
    setTimeout(function () {
        $("." + color).removeClass("pressed");
    }, 100);
}

// function start() {
//     level = 0;
//     List = [];
//     started = false;
//     alert("hello");

// }

function startOver() {
    level = 0;
    List = [];
    started = false;
  }

function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}