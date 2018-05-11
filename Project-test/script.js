$(function () {

        'use strict';


        var anim_id,
            game_over = false,
            score_counter = 1,
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
            restart_div = $('#restart_div'),
            restart_btn = $('#restart'),
            score = $('#score'),
            highscore = $('#highscore'),
            highscore_counter = 0,
            container = $('#container'),
            container_left = parseInt(container.css('left')),
            container_width = parseInt(container.width()),
            container_height = parseInt(container.height()),
            car_width = parseInt(car.width()),
            car_height = parseInt(car.height()),
            move_right = false,
            move_left = false,
            move_up = false,
            move_down = false;



        function getCookie() {

            var re = new RegExp('Gebruiker' + "=([^;]+)");
            var cookie = re.exec(document.cookie).toString();

            if (cookie != "" && cookie != null) {

                var informatie = cookie.split("=");

                geslacht = informatie[1];

                document.getElementById('#highscore').value = parseInt(score_counter);
            }
        }


        // Bewegen


        function left() {
            if (game_over === false && parseInt(car.css('left')) > 0) {
                car.css('left', parseInt(car.css('left')) - 5);
                move_left = requestAnimationFrame(left);
            }
        }

        function right() {
            if (game_over === false && parseInt(car.css('left')) < container_width - car_width) {
                car.css('left', parseInt(car.css('left')) + 5);
                move_right = requestAnimationFrame(right);
            }
        }


        function leftend() {
            cancelAnimationFrame(move_left);
            move_left = false;
        }

        function rightend() {
            cancelAnimationFrame(move_right);
            move_right = false;
        }

        document.getElementById("links").addEventListener("touchstart", left);
        document.getElementById("rechts").addEventListener("touchstart", right);

        document.getElementById("links").addEventListener("touchend", leftend);
        document.getElementById("rechts").addEventListener("touchend", rightend);


        $("#links").mousedown(function () {
            if (game_over === false) {
                move_left = requestAnimationFrame(left);
            }
        })

        $("#links").mouseup(function () {
            if (game_over === false) {
                leftend();
            }
        })

        $("#rechts").mousedown(function () {
            if (game_over === false) {
                move_right = requestAnimationFrame(right);
            }
        })

        $("#rechts").mouseup(function () {
            if (game_over === false) {
                rightend();
            }
        })



        anim_id = requestAnimationFrame(repeat);

        function repeat() {
            if (collision(car, car_1) || collision(car, car_2) || collision(car, car_3)) {
                stop_the_game();
                return;
            }

            score_counter++;

            if (score_counter % 20 == 0) {
                score.text(parseInt(score.text()) + 1);
            }
            if (score_counter % 500 == 0) {
                speed + 1;
                line_speed + 1;
            }

            car_down(car_1);
            car_down(car_2);
            car_down(car_3);

            line_down(line_1);
            line_down(line_2);
            line_down(line_3);
            line_down(line_4);

            anim_id = requestAnimationFrame(repeat);
        }

        //de auto's laten zakken
        function car_down(car) {
            var car_current_top = parseInt(car.css('top'));
            if (car_current_top > container_height) {
                car_current_top = -200;
                var car_left = parseInt(Math.random() * (container_width - car_width));
                car.css('left', car_left);
            }
            car.css('top', car_current_top + speed);
        }


        //de lijnen laten zakken
        function line_down(line) {
            var line_current_top = parseInt(line.css('top'));
            if (line_current_top > container_height) {
                line_current_top = -300;
            }
            line.css('top', line_current_top + line_speed);
        }

        //Kijken of er een botsing is


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
        function stop_the_game() {
            game_over = true;
            cancelAnimationFrame(anim_id);
            cancelAnimationFrame(move_right);
            cancelAnimationFrame(move_left);
            restart_div.slideDown();
            restart_btn.focus();
            if (score_counter > highscore_counter) {
                function setCookie() {
                    var d = new Date();
                    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
                    var expires = "expires=" + d.toUTCString();
                    var stringCookie = "Gebruiker=" + score_counter ";";
                    document.cookie = stringCookie + expires + ";path=/";
                }

            }



        }
    }
}

//herstarten spel Moet nog werken

restart_btn.click(function () {
    location.reload();
});


document.getElementById("restart").addEventListener("touchstart", location.reload);



});
