/**
 * Created by Jonas on 2017-03-03.
 * Tilldelar ett prov till alla studenter i en klass.
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
                newContent += '<p class="testIdValue">' + data[i].testId + '</p>';
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
                newContent += '<select class="floatRight" id="listClass" name="klass"></select>';
            $content.find('.testIdValue').hide();
                newContent += '</ul></section>';
            }

            $content.append(newContent);

            $.get('http://127.0.0.1:8000/classes/', function (data) {
                for(var i = 0; i < data.length; i++){
                    $content.find('.box #listClass').append(
                        "<option value=" + data[i].listClass +">"+ data[i].listClass+"</option>"
                    );
                }
            });
        });
    });

    $content.on('click', '.assign', function () {
        var $selectedElement = $(this);
        var selectedTestId = $selectedElement.parent().find(".testIdValue").text();
        var selectedClass = $selectedElement.parent().find("#listClass").val();
        var sql = {'klass':selectedClass};

        $.post('http://127.0.0.1:8000/getStudentIds/',sql, function (data) {
            for(var i = 0; i < data.length; i++){
                var sqlTest = {'StudentId': data[i].studentId, 'TestId': selectedTestId};
                console.log(sqlTest);
                $.post('http://127.0.0.1:8000/setStudentsTest/',sqlTest, function (data) {});
            }
        });
    });
});