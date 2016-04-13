(function() {

var moleHill = $(".mole_hill");
var score = 0;
var count = 0;
var high = 0;
var start_time = 8;

$("#seconds").text(start_time);

// create grid layout
moleHill.each(function (index, square) {
    if ((index) % 3 == 0)  {
        $(this).css("clear", "left");
    };
});

// function: random number generator
function chooseMoleHill (min, max) {
    max = (moleHill.length-1);
    min = 0;
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// function to start the game
function startGame() {
    score=0;
    count=0;
    activeMoles=[];
    $("#score").text(score);
    reverseAnimate();
    moleAttack();
    $("#start").off ("click", startGame);
}

// gameplay function
function moleAttack() {
    // begin timer function
    var timer = start_time;
    $("#seconds").text(timer);
    $("#start").fadeToggle();

    var intervalId = setInterval(function () {
        if (timer > 0) {
            timer--;
            $("#seconds").text(timer);
        } else {
            clearInterval(moleInterval);
            animation();
            clearInterval(intervalId);
            $("#start").on ("click", startGame).fadeToggle();
        }
    }, 1000);

    // function whack is what happens when you whack a mole - fade out mole, add to score, update local high score if applicable
    var whack = function () {
        $(this).animate({
            opacity: "0.0"
        },moleSpeed);
        if (timer > 0) {
            score++;
            count++;
        };
        $("#score").text(score);
        if (score > high) {
            high=score;
            $("#high_score").text(high);
        };               
        $(this).off("mouseover", whack);
    };

    // function nowhack fades out a mole if it's not whacked, and doesn't add to score
    var noWhack = function(square) {
        $(square).animate({
            opacity: "0.0"
        },1);
        $(square).off("mouseover", whack);
    };

    // begin mole interval function
    var interval = 1300;
    var moleSpeed = 600;
    var moleInterval = setInterval(function() {
        var index = chooseMoleHill();
        var square = moleHill.eq(index);
        // console.log(typeof(index));
        square.animate({
            opacity: "1.0"
        },moleSpeed);
        square.on("mouseover", whack);
        var moleLeave = setTimeout(function() {
            noWhack(square);
        }, moleSpeed);
    }, interval);
}; // end moleAttack (ie, gameplay) function

// gollum humbly returns to starting position
function reverseAnimate() {
    $("#gollum").animate({
        bottom: "-350"
    });
    $("#gollum").animate({
        left: "-250"
    });
};

// gollum emerges, timing and audio varies on player success as a percentage
function animation() {
    if (score/count > 0.8) {
        var sound = document.getElementById("precious");
        sound.play();
        setTimeout(function() {
            $("#gollum").animate({
                left: "-100",
                bottom: "-220"
            }, 2000);
        }, 1500);
    } else {
        $("#gollum").animate({
            left: "-100",
            bottom: "-220"
        }, 1000);
        setTimeout(function() {
            var sound = document.getElementById("stupid");
            sound.play();
        }, 400);
    };
};

// start button listener
$("#start").on ("click", startGame);
})();






