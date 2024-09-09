var buttonColors = ["red", "green", "blue", "yellow"];

var gamePattern = [];
var buttonsClicked = [];
var click = false;
var level = 1;
var ok=0;

function nextSequence() {
    return Math.floor(Math.random() * 4);
}

var start = false;

$(document).on("keypress", function (event) {

    if (start === false) {
        start = true;
        gamePattern = [];
        buttonsClicked = [];
        level = 1;
        playGame();
    } else {
        console.log("game already started");
    }

})

$(".btn").on("click", function (event) {
    buttonsClicked.push(event.target.id);

    event.target.classList.add("pressed");
    setTimeout(function () {event.target.classList.remove("pressed");}, 100);

    var sound = new Audio("sounds/" + event.target.id + ".mp3");
    sound.play();

    if (checkColor() === true) {
        ok++;
    }
    else {
        $("h1").text("Fail press any key to restart game");
        var sound2 = new Audio("sounds/wrong.mp3");
        sound2.play();
        start = false;
        ok=0;
        console.log($("body"));
        $("body").addClass("game-over");
        setTimeout(function () {$("body").removeClass("game-over");}, 300);
    }

    if(ok === level){
        level++;
        setTimeout(playGame, 100);
        buttonsClicked = [];
        ok=0;
    }
})

function checkColor() {

    for (var i = 0; i < buttonsClicked.length; i++) {
        if (buttonsClicked[i] !== gamePattern[i]) {
            return false;
        }
    }
    return true;
}

function playGame() {

    $("h1").text("Level " + level);
    var nextColor = buttonColors[nextSequence()];
    gamePattern.push(nextColor);

    $("#" + nextColor).fadeOut(250).fadeIn(250);

}



