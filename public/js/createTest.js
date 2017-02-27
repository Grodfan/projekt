/**
 * Created by Jonas on 2017-02-25.
 */
$(document).ready(function () {
    var $content = $('#content');

    $('#createTest').click(function () {

        var newContent = '';

            newContent += '<div><p>Ange testets namn: <input id="testName" type="text" name="testName">';
            newContent += ' Ange kursens namn: <select id="courseName" name="courseName"></select>';
            newContent += ' Ange klassen: <select id="listClass" name="listClass"></select></p>';
            newContent += '<p><form id="selfCorrectingCheckbox" method="post"> Provet ska vara självrättande <input type="checkbox" name="wantItSelfCorrectingTest" value="selfcorrecting"></form>';
            newContent += '<form id="approveSeResult" method="post">Eleven ska kunna se resultatet och svaren direkt<input type="checkbox" name="approvalToSeTestResults" value="approvalTestResults"></form></p>';
            newContent += '<p>Välj typ av fråga: <select id="typeOfQuestion" name="typeOfQuestion">';
            newContent += '<option value="empty"></option>';
            newContent += '<option value="multiple">Flervalsfråga</option>';
            newContent += '<option value="alternative">Alternativfråga</option>';
            newContent += '<option value="ranking">Rangordningsfråga</option>';
            newContent += '</select> </p></div>';

        $content.html(newContent);

        $('div').addClass('box');

        $.get('http://127.0.0.1:8000/classes/', function (data) {
            for(var i = 0; i < data.length; i++){
                $('#listClass').append(
                    "<option value=" + data[i].class +">"+ data[i].class+"</option>"
                )
            }
        });
    });

    $content.on('blur','#typeOfQuestion', function () {
        var inputUserType = $('#typeOfQuestion option:selected').val();
        var newQuestion = '';

        if(inputUserType === 'multiple'){

            newQuestion += '<div>';
            newQuestion += '<h4>Flervalsfråga:</h4>';
            newQuestion += '<label>Fråga:</label><input type="text" name="questionDescribtion"/>';
            newQuestion += '<p>Ange hur många alternativ frågan ska ha:';
            newQuestion += '<select class ="amountOfAlternatives" name="amountOfAlternatives">';
            newQuestion += '<option value="1">1</option>';
            newQuestion += '<option value="2">2</option>';
            newQuestion += '<option value="3">3</option>';
            newQuestion += '<option value="4">4</option>';
            newQuestion += '<option value="5">5</option>';
            newQuestion += '</select></p></div>';

            $content.append(newQuestion);
            $('div').addClass('box');
        }
        else if(inputUserType === 'alternative'){

            newQuestion += '<div>';
            newQuestion += '<h4>Alternativfråga:</h4>';
            newQuestion += '<label>Fråga:</label><input type="text" name="questionDescribtion"/>';
            newQuestion += '<p>Ange hur många alternativ frågan ska ha:';
            newQuestion += '<select class ="amountOfAlternatives" name="amountOfAlternatives">';
            newQuestion += '<option value="1">1</option>';
            newQuestion += '<option value="2">2</option>';
            newQuestion += '<option value="3">3</option>';
            newQuestion += '<option value="4">4</option>';
            newQuestion += '<option value="5">5</option>';
            newQuestion += '</select></p></div>';

            $content.append(newQuestion);
            $('div').addClass('box');

        }
        else if(inputUserType === 'ranking'){

            newQuestion += '<div>';
            newQuestion += '<h4>Rangordningsfråga:</h4>';
            newQuestion += '<label>Fråga:</label><input type="text" name="questionDescribtion">';
            newQuestion += '<p>Ange hur många alternativ frågan ska ha:';
            newQuestion += '<select class ="amountOfAlternativesRank" name="amountOfAlternatives">';
            newQuestion += '<option value="1">1</option>';
            newQuestion += '<option value="2">2</option>';
            newQuestion += '<option value="3">3</option>';
            newQuestion += '<option value="4">4</option>';
            newQuestion += '<option value="5">5</option>';
            newQuestion += '</select></p></div>';

            $content.append(newQuestion);
            $('div').addClass('box');
        }
    });

    $content.on('click','.amountOfAlternatives', function () {
        var newContent = '';
        var selectedElement = $(this);
        var selectedValue = selectedElement.val();

        selectedElement.parent().find(".removeAlternativeAnswer").remove();

            for(var i = 0; i < selectedValue; i++){
                newContent += '<p class="removeAlternativeAnswer">Alternativ: <input  type="text" name="alternativeAnswerText">';
                newContent += '<label> Rätt svar</label><input type="checkbox" name="correct" value="correctAnswer"/></p>'
            }

        selectedElement.parent().append(newContent);
    })

    $content.on('click','.amountOfAlternativesRank', function () {
        var newContent = '';
        var selectedElement = $(this);
        var selectedValue = selectedElement.val();

        selectedElement.parent().find(".removeAlternativeAnswer").remove();

            for(var i = 0; i < selectedValue; i++){
                newContent += '<p class="removeAlternativeAnswer">Alternativ: <input  type="text" name="alternativeAnswerText"></p>';
            }

        selectedElement.parent().append(newContent);
    });


});