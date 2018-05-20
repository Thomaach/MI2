'use strict';
$(function () {
    speel();
    
    if (typeof (Storage) !== "undefined") {
        // get
        document.getElementById("highscore").innerHTML = localStorage.getItem("Highscore");
        highscore_counter = localStorage.getItem("Highscore")
    } else{
        document.getElementById("higscore").innerHTML = "0";
    }
});



var anim_id,
    game_over = false,
    score_snel= 1,
    scoreteller = 0,
    speed = 3,
    line_speed = 5,
    car = $('#car'),
    car_1 = $('#car_1'),
    car_2 = $('#car_2'),
    car_3 = $('#car_3'),
    line_1 = $('#line_1'),
    line_2 = $('#line_2'),
    line_3 = $('#line_3'),
    line_4 = $('#line_4'),
    line_5 = $('#line_5'),
    line_6 = $('#line_6'),
    line_7 = $('#line_7'),
    restart_div = $('#restart_div'),
    restart_btn = $('#restart'),
    score = $('#score'),
    highscore = $('#highscore'),
    highscore_counter,
    container = $('#container'),
    container_left = parseInt(container.css('left')),
    container_width = parseInt(container.width()),
    container_height = parseInt(container.height()),
    car_width = parseInt(car.width()),
    car_height = parseInt(car.height()),
    move_right = false,
    move_left = false,
    move_down = false;




// Functie voor het bewegen naar links
function left() {
    if (game_over === false && parseInt(car.css('left')) > 0) {
        car.css('left', parseInt(car.css('left')) - 5);
        move_left = requestAnimationFrame(left);
    }
}

// Functie voor het bewegen naar rechts
function right() {
    if (game_over === false && parseInt(car.css('left')) < container_width - car_width) {
        car.css('left', parseInt(car.css('left')) + 5);
        move_right = requestAnimationFrame(right);
    }
}

// Functie voor het bewegen naar links te laten stoppen
function leftstop() {
    cancelAnimationFrame(move_left);

}

// Functie voor het bewegen naar rechts te laten stoppen
function rightstop() {
    cancelAnimationFrame(move_right);

}

// Kijken of er het beeld geraakt wordt op een bepaalde plaats en dan de functie om naar links te gaan oproepen
document.getElementById("links").addEventListener("touchstart", left);

// Kijken of er het beeld geraakt wordt op een bepaalde plaats en dan de functie om naar rechts te gaan oproepen
document.getElementById("rechts").addEventListener("touchstart", right);

// Kijken of er het beeld niet meer geraakt wordt op een bepaalde plaats en dan de funtie oproepen om te stoppen met naar links te gaan
document.getElementById("links").addEventListener("touchend", leftstop);

// Kijken of er het beeld neit meer geraakt wordt op een bepaalde plaats en dan de funtie oproepen om te stoppen met naar rechts te gaan
document.getElementById("rechts").addEventListener("touchend", rightstop);

//kijkt of er geklikt wordt op een bepaalde plaats om dan de funtie om naar links te gaan op te roepen
$("#links").mousedown(function () {
    if (game_over === false) {
        move_left = requestAnimationFrame(left);
    }
})


//kijkt of er geklikt wordt op een bepaalde plaats om dan de funtie oproepen om te stoppen met naar links te gaan
$("#links").mouseup(function () {
    if (game_over === false) {
        leftstop();
    }
})

//kijkt of er geklikt wordt op een bepaalde plaats om dan de funtie om naar links te gaan op te roepen
$("#rechts").mousedown(function () {
    if (game_over === false) {
        move_right = requestAnimationFrame(right);
    }
})

//kijkt of er geklikt wordt op een bepaalde plaats om dan de funtie oproepen om te stoppen met naar rechts te gaan
$("#rechts").mouseup(function () {
    if (game_over === false) {
        rightstop();
    }
})


//auto's en lijnen laten zakken, score omhoog laten gaan en alles herhalen
anim_id = requestAnimationFrame(speel);

function speel() {
    if (collision(car, car_1) || collision(car, car_2) || collision(car, car_3)) {
        stop();
        return;
    }
    score_snel++;
    if (score_snel % 20 == 0) {
        score.text(parseInt(score.text()) + 1);
        scoreteller = score.text();
    }
    if (score_snel % 500 == 0) {
        speed + 1;
        line_speed + 1;
    }
    autoLatenZakken(car_1);
    autoLatenZakken(car_2);
    autoLatenZakken(car_3);
    lijnLatenZakken(line_1);
    lijnLatenZakken(line_2);
    lijnLatenZakken(line_3);
    lijnLatenZakken(line_4);
    lijnLatenZakken(line_5);
    lijnLatenZakken(line_6);
    lijnLatenZakken(line_7);
    anim_id = requestAnimationFrame(speel);
}

//Funtie om de auto's te laten zakken
function autoLatenZakken(car) {
    var car_current_top = parseInt(car.css('top'));
    if (car_current_top > container_height) {
        car_current_top = -200;
        var car_left = parseInt(Math.random() * (container_width - car_width));
        car.css('left', car_left);
    }
    car.css('top', car_current_top + speed);
}


//Funtie om de lijnen te laten zakken
function lijnLatenZakken(line) {
    var line_current_top = parseInt(line.css('top'));
    if (line_current_top > container_height) {
        line_current_top = -300;
    }
    line.css('top', line_current_top + line_speed);
}

//Kijken of er een botsing is tussen 2 meegeven div's
//Dit stuk code heeft een medestudent me gegeven
function collision($div1, $div2) {
    var x1 = $div1.offset().left,
        y1 = $div1.offset().top,
        h1 = $div1.outerHeight(true),
        w1 = $div1.outerWidth(true),
        b1 = y1 + h1,
        r1 = x1 + w1,
        x2 = $div2.offset().left,
        y2 = $div2.offset().top,
        h2 = $div2.outerHeight(true),
        w2 = $div2.outerWidth(true),
        b2 = y2 + h2,
        r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}

//Game stoppen
function stop() {
    game_over = true;
    restart_div.slideDown();
    //als de score groter is dan de eerdere highscore wordt er een nieuwe highscore gezet
    if (scoreteller > highscore_counter) {
        localStorage.setItem("Highscore", scoreteller);
    }
}

    //herstarten spel voor computers
    restart_btn.click(function () {
        location.reload();
    });

    //spel herstarten voor apparaten met touch
    document.getElementById("restart").addEventListener("touchstart", location.reload);
