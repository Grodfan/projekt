/**
 * Nedräknare: Tar emot antal minuter från användaren. Gör sedan om minutrarna
 * till millesekunder och räknar därefter ut antal timmar, minuter och sekunder.
 *
 * Created by Jonas on 2017-02-13.
 *
 */

var $start = $("#start");

$($start).click(function () {
    $start.hide();

    var $content = $("#content");
    var $inputTimeInMin = $("#time").hide().val();
    var time = $inputTimeInMin * 60000;
    var hour, min, sec;

    var startTimer = setInterval(function () {

        hour = Math.floor(time / 3600000);
        min = Math.floor(time % 3600000 / 60000);
        sec = time % 3600000 % 60000 / 1000;

           $content.text("Hour: " + hour + " Min: " + min + " Sek: " + sec);

                if (time <= 0){
                    $content.hide();
                    $("#done").text("Tiden ute!");
                    clearInterval(startTimer);
                }

        time -= 1000;

    }, 1000);
});