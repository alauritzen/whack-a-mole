(function() {

var moleHill = $(".mole_hill");
var score = 0;

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

// function to flash moles
// include timer function
function moleAttack() {
    // begin timer function
    var timer = 10;
    var intervalId = setInterval(function () {
        if (timer > 0) {
            timer--;
            $("#seconds").text(timer);
        } else {
            clearInterval(moleInterval);
            animation();
        }
    }, 1000);
    // function whack is what happens when you whack a mole
    var whack = function () {
        $(this).animate({
            opacity: "0.0"
        },moleSpeed);
        if (timer > 0) {
            score++;                
        }
        $("#score").text(score);
        $(this).off("mouseover", whack);
    };

    var noWhack = function(square) {
        console.log("noWhack ran");
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
        console.log(square);
        square.animate({
            opacity: "1.0"
        },moleSpeed);
        square.on("mouseover", whack);
        var moleLeave = setTimeout(function() {
            noWhack(square);
        }, moleSpeed);
    }, interval);



/*
        square.animate({
            opacity: "0.0"
        }, interval);
        square.off("mouseover", whack);
        */
        
        
};


function animation() {
    $("#gollum").animate({
        left: "-100",
        bottom: "-220"
    }, 200);
}


moleAttack();










})();