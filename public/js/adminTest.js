/**
 * Created by Jonas on 2017-03-03.
 */
$(document).ready(function () {
    var $content = $('#content');

    $('#test').on('click', function () {
        $content.empty();
        var newContent = '';
        var selfCorrect = '';
        var seeTestAfter = '';

        $.get('http://127.0.0.1:8000/select*test/', function (data) {

            for (var i in data) {
                newContent += '<section class="box"><ul>'
                newContent += '<P><li class="adminTest"><b>Namn:</b> ' + data[i].testName + '</li></P>';
                newContent += '<li class="adminTest"><b>Kurskod:</b> ' + data[i].courseName + '</li>';

                    if(data[i].selfCorrect === 'true'){
                         selfCorrect = 'Ja';
                    }
                    else if(data[i].selfCorrect === 'false'){
                         selfCorrect = 'Nej';
                    }

                newContent += '<li class="adminTest"><b>Sjävrättande:</b> ' + selfCorrect + '</li>' ;

                    if(data[i].seeTestAfter === 'true'){
                        seeTestAfter = 'Ja';
                    }
                    else if(data[i].seeTestAfter === 'false'){
                        seeTestAfter = 'Nej';
                    }

                newContent += '<li class="adminTest"><b>Se prov:</b> ' + seeTestAfter + '</li>';
                newContent += '<li class="adminTest"><b>Datum:</b> ' + data[i].lastDate + '</li>';
                newContent += '<li class="adminTest"><b>Tid:</b> ' + data[i].timeForTestMINUTES + ' min</li>';
                newContent += '<button class="floatRight">Tilldela</button>'
                newContent += '</ul></section>';
            }

            $content.append(newContent);
        });
    });

});