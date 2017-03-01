/**
 * Created by Henrik Berglund on 2017-03-01.
 */

$(document).ready(function () {
    /* HÄR FINNS ALL METODER FÖR ATT HÄMTA FRÅN DATABASEN!*/

    /*SELECT * FROM ADMINUSER TABLE*/
    $.get('http://127.0.0.1:8000/select*adminuser/', function (result) {

        for (var i in result) {
            var attribute = result[i];
        }

    });

    /*SELECT * FROM TEACHER TABLE*/
    $.get('http://127.0.0.1:8000/select*teacher/', function (result) {

        for (var i in result) {
            var attribute = result[i];
        }

    });


    /*SELECT * FROM STUDENT TABLE*/
    $.get('http://127.0.0.1:8000/select*student/', function (result) {

        for (var i in result) {
            var attribute = result[i];
        }

    });

    /*SELECT * FROM TEST TABLE*/
    $.get('http://127.0.0.1:8000/select*test/', function (result) {

        for (var i in result) {
            var attribute = result[i];
        }

    });


    /*SELECT * FROM QUESTION TABLE*/
    $.get('http://127.0.0.1:8000/select*question/', function (result) {

        for (var i in result) {
            var attribute = result[i];
        }

    });

    /*SELECT * FROM ANSWER TABLE*/
    $.get('http://127.0.0.1:8000/select*answers/', function (result) {

        for (var i in result) {
            var attribute = result[i];
        }

    });

    /*SELECT * FROM STUDEENTTEST  TABLE*/
    $.get('http://127.0.0.1:8000/select*studenttests/', function (result) {

        for (var i in result) {
            var attribute = result[i];
        }
    });

    /*SELECT * FROM STUDENTANSWERS TABLE*/
    $.get('http://127.0.0.1:8000/select*studentanswers/', function (result) {

        for (var i in result) {
            var attribute = result[i];
        }

    });



}