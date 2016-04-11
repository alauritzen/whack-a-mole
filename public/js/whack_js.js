(function() {

var moleHill = $(".mole_hill");

// create grid layout
moleHill.each(function (index, tile) {
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
    var timer = 10;
    // begin timer function
    var intervalId = setInterval(function () {
        if (timer > 0) {
            timer--;
            $("#seconds").text(timer);
        } else {
            clearInterval(moleInterval);
        }
    }, 1000);
    // begin mole interval function
    var interval = 1200;
    var moleInterval = setInterval(function() {
        var index=chooseMoleHill();
        console.log(index);
        moleHill.eq(index).css("background-color", "red");
        // add animation here

    }, interval);
};


// moleHill.eq(1).css("background-color", "red");


moleAttack();









})();