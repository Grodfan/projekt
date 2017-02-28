/**
 * Created by Jonas on 2017-02-25.
 */
$(document).ready(function () {
    var $content = $('#content');

    var counter = 1;

    var testId;

    $('#createTest').click(function () {

        var newContent = '';

            newContent += '<section class="box"><p>Ange testets namn: <input id="testName" type="text" name="testName">';
            newContent += ' Ange kursens namn: <select id="courseName" name="courseName"></select>';
            newContent += ' Ange klassen: <select id="listClass" name="listClass"></select></p>';
            newContent += '<p>Provet ska vara självrättande <input id="selfCorrect" type="checkbox" name="selfCorrect" value="selfCorrect"></p>';
            newContent += '<p>Eleven ska kunna se resultatet och svaren direkt<input id="seeTestAfter" type="checkbox" name="seeTestAfter" value="seeTestAfter"></p>';
            newContent += '</section>';

        $content.html(newContent);

        $.get('http://127.0.0.1:8000/classes/', function (data) {
            for(var i = 0; i < data.length; i++){
                $('#listClass').append(
                    "<option value=" + data[i].class +">"+ data[i].class+"</option>"
                )
            }
        });
    });

    $content.on('click','#typeOfQuestion', function () {
        var $selectedElement = $(this);
        var inputUserType = $selectedElement.val();
        var newQuestion = '';

        $selectedElement.parent().find(".removeQuestion").remove();

        if(inputUserType === 'multiple'){

            newQuestion += '<section class="removeQuestion">';
            newQuestion += '<h4 id="questionType'+counter+'">Flervalsfråga:</h4>';
            newQuestion += '<label>Fråga:</label><input id="questionText'+counter+'" type="text" name="questionDescribtion"/>';
            newQuestion += '<p>Ange hur många alternativ frågan ska ha:';
            newQuestion += '<select class ="amountOfAlternatives" name="amountOfAlternatives">';
            newQuestion += '<option value="empty"></option>';
            newQuestion += '<option value="2">2</option>';
            newQuestion += '<option value="3">3</option>';
            newQuestion += '<option value="4">4</option>';
            newQuestion += '<option value="5">5</option>';
            newQuestion += '</p></section>';

            $selectedElement.parent().append(newQuestion);
        }
        else if(inputUserType === 'alternative'){

            newQuestion += '<section class="removeQuestion">';
            newQuestion += '<h4 id="questionType'+counter+'">Alternativfråga:</h4>';
            newQuestion += '<label>Fråga:</label><input id="questionText'+counter+'" type="text" name="questionDescribtion"/>';
            newQuestion += '<p>Ange hur många alternativ frågan ska ha:';
            newQuestion += '<select class ="amountOfAlternatives" name="amountOfAlternatives">';
            newQuestion += '<option value="empty"></option>';
            newQuestion += '<option value="2">2</option>';
            newQuestion += '<option value="3">3</option>';
            newQuestion += '<option value="4">4</option>';
            newQuestion += '<option value="5">5</option>';
            newQuestion += '</select></p></section>';

            $selectedElement.parent().append(newQuestion);
        }
        else if(inputUserType === 'ranking'){

            newQuestion += '<section class="removeQuestion">';
            newQuestion += '<h4 id="questionType'+counter+'">Rangordningsfråga:</h4>';
            newQuestion += '<label>Fråga:</label><input id="questionText'+counter+'" type="text" name="questionDescribtion">';
            newQuestion += '<p>Ange hur många alternativ frågan ska ha:';
            newQuestion += '<select class ="amountOfAlternativesRank" name="amountOfAlternatives">';
            newQuestion += '<option value="empty"></option>';
            newQuestion += '<option value="2">2</option>';
            newQuestion += '<option value="3">3</option>';
            newQuestion += '<option value="4">4</option>';
            newQuestion += '<option value="5">5</option>';
            newQuestion += '</select></p></section>';

            $selectedElement.parent().append(newQuestion);
        }

        counter++;
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
    });

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

    $('#saveTest').click(function (e) {
        e.preventDefault();
        testId = '';
        var testName = $('#testName').val();
        var selfCorrect = $('#selfCorrect').is(':checked');
        var seeTestAfter = $('#seeTestAfter').is(':checked');

        var sql = {'testName': testName, 'selfCorrect': selfCorrect, 'seeTestAfter': seeTestAfter};
        var sqlTestId = {'testName': testName};

        $.post('http://127.0.0.1:8000/newTest/', sql, function() {});
        $.post('http://127.0.0.1:8000/getTestId/', sqlTestId, function (data) {

            testId = data[0].testId;


        for(var i = 0; i < counter; i++){

            var questionText = $('#questionText' + i).val();
            var questionType = $('#questionType+i').val();
            var testid = testId;


            var sql = {'testName': testName, 'selfCorrect': selfCorrect, 'seeTestAfter': seeTestAfter};

            $.post('http://127.0.0.1:8000/newTest/', sql, function() {});

            for
        }













             $('.boxQ').each(function () {
                 console.log('mu');
             });

            console.log(testId);
        });

    });

    $('#newQuestion').click(function () {
        var newContent = '';

            newContent += '<section class="boxQ">';
            newContent += '<p>Välj typ av fråga: <select class="changeQuestion" id="typeOfQuestion" name="typeOfQuestion">';
            newContent += '<option value="empty"></option>';
            newContent += '<option value="multiple">Flervalsfråga</option>';
            newContent += '<option value="alternative">Alternativfråga</option>';
            newContent += '<option value="ranking">Rangordningsfråga</option>';
            newContent += '</select></p></section>';

         $content.append(newContent);
    });
});