/**
 * Created by Jonas on 2017-02-25.
 * Creates a new test.
 */
$(document).ready(function () {
    var $content = $('#content');

    $('#createTest').click(function () {

        $content.empty();
        var newContent = '';

            newContent += '<section class="box"><p>Namn: <input id="testName" type="text" name="testName"/>';
            newContent += ' Kurskod <select id="courseName" name="courseName"></select>';
            newContent += '<p>Självrättande <input id="selfCorrect" type="checkbox" name="selfCorrect" value="selfCorrect">';
            newContent += 'Visa resultat <input id="seeTestAfter" type="checkbox" name="seeTestAfter" value="seeTestAfter"/></p>';
            newContent += '<p>Datum <input class="dateWidth" id="lastDate" name="lastDate" type="text" />';
            newContent += ' Minuter <input id="timeForTestMinutes" type="number" min="0" value="0" name="timeForTestMinutes"/></p>';
            newContent += '</section>';

        $content.append(newContent);

        var newButton = '';
        newButton += '<p><button id="newQuestion">Lägg till fråga</button>';
        newButton += '<button id="saveTest">Spara test</button></p>';

        $content.append(newButton);

        $.get('http://127.0.0.1:8000/courseCodes/', function (data) {
            for(var i = 0; i < data.length; i++){
                $('#courseName').append(
                    "<option value=" + data[i].courseCode +">"+ data[i].courseCode+"</option>"
                )
            }
        });
    });

    $content.on('click','.typeOfQuestion', function () {
        var $selectedElement = $(this);
        var inputUserType = $selectedElement.val();
        var newQuestion = '';

        $selectedElement.parent().find(".removeQuestion").remove();

        if(inputUserType === 'multiple'){

            newQuestion += '<section class="removeQuestion">';
            newQuestion += '<p><label>Fråga:</label><input id="questionText" type="text" name="questionText"/></p>';
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
        else if(inputUserType === 'alternative'){

            newQuestion += '<section class="removeQuestion">';
            newQuestion += '<p><label>Fråga:</label><input id="questionText" type="text" name="questionText"/></p>';
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
            newQuestion += '<p><label>Fråga:</label><input id="questionText" type="text" name="questionText"></p>';
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
    });

    $content.on('click','.amountOfAlternatives', function () {
        var newContent = '';
        var selectedElement = $(this);
        var selectedValue = selectedElement.val();
        var typeOfQuestion = selectedElement.closest('.boxQ').find('.typeOfQuestion').val();

        selectedElement.parent().find(".removeAlternativeAnswer").remove();

            for(var i = 0; i < selectedValue; i++){
                newContent += '<p class="removeAlternativeAnswer">Alternativ: <input id="answerText" type="text" name="answerText">';
                newContent += '<label class="hideRightAnswer"> Rätt svar</label><input type="checkbox" class="answerStatusC" id="answerStatus" name="answerStatus" value="answerStatus"/></p>';
            }

        selectedElement.parent().append(newContent);

        if(typeOfQuestion === 'ranking'){
                selectedElement.closest('.boxQ').find('.answerStatusC, .hideRightAnswer').addClass('hidden');
        }
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

    $content.on('click', '#saveTest', function (e) {
        e.preventDefault();
        var testId = '';
        var testName = $('#testName').val();
        var courseCode = $('#courseName').val();
        var selfCorrect = $('#selfCorrect').is(':checked');
        var seeTestAfter = $('#seeTestAfter').is(':checked');
        var lastDate = $('#lastDate').val();
        var timeForTestMinutes = $('#timeForTestMinutes').val();

        var sql = {'testName': testName,'courseName':courseCode, 'selfCorrect': selfCorrect, 'seeTestAfter': seeTestAfter,
            'lastDate':lastDate, 'timeForTestMinutes': timeForTestMinutes};
        var sqlTestId = {'testName': testName};

        $.post('http://127.0.0.1:8000/newTest/', sql, function() {
        $.post('http://127.0.0.1:8000/getTestId/', sqlTestId, function (data) {

            testId = data[0].testId;

           // var typeOfQuestion ='';
           // var sqlQuestionText ='';
            //var questionText ='';
           // var sqlQuestionId = '';
            var answer = 0;
            var total = 0;
            var getQuestionId = 0;

            for(var i = 0; i <  $('.boxQ .typeOfQuestion').length; i++ ) {
                var typeOfQuestion = $('.boxQ .typeOfQuestion').eq(i).val();
                var questionText = $('.boxQ #questionText').eq(i).val();
                var gradeG = $('.boxQ #gradeG').eq(i).is(':checked');
                var gradeVg = $('.boxQ #gradeVg').eq(i).is(':checked');

                var sqlQuestionText = {'testId': testId, 'typeOfQuestion': typeOfQuestion, 'questionText': questionText,
                                  'gradeG': gradeG, 'gradeVg':gradeVg};

                $.post('http://127.0.0.1:8000/newQuestion/', sqlQuestionText, function () {
                    var questionText = $('.boxQ #questionText').eq(getQuestionId).val();
                    var sqlQuestionId = {'questionText': questionText};
                    getQuestionId++;
                $.post('http://127.0.0.1:8000/getQuestionId/', sqlQuestionId, function (dataQ) {

                    var questionId = dataQ[0].questionId;
                    var forTotal = total;

                        for (var k = 0; k < $('.boxQ #answerText').length; k++) {
                            var getTotalQuestions = $('.boxQ .amountOfAlternatives').eq(answer).val();
                            var answerText = $('.boxQ #answerText').eq(forTotal).val();
                            var answerStatus = $('.boxQ #answerStatus').eq(forTotal).is(':checked');
                            var sqlAnswerText = {'questionId': questionId, 'answerStatus': answerStatus, 'answerText': answerText};
                            console.log(sqlAnswerText);
                            $.post('http://127.0.0.1:8000/newAnswers/', sqlAnswerText, function () {});

                            if (k < (parseInt(getTotalQuestions)-1)) {
                                forTotal++;
                            }
                            else {
                                break;
                            }
                        }
                    answer++;
                    total += parseInt(getTotalQuestions);
                });
                });
            }
        });
        });

       //$(this).parent().detach();$(this).parent().detach();
        $(this).parent().parent().find('.box, .boxQ').hide();
        $(this).closest('p').hide();
         var newContent = '<section class="boxQ"> Prov tillagt!</section>';
        $content.append(newContent);
    });

    $content.on('click', '#newQuestion', function () {

        var newContent = '';

            newContent += '<section class="boxQ">';

            newContent += '<p>Välj typ av fråga: <select class="typeOfQuestion" name="typeOfQuestion">';
            newContent += '<option value="empty"></option>';
            newContent += '<option value="multiple">Flervalsfråga</option>';
            newContent += '<option value="alternative">Alternativfråga</option>';
            //newContent += '<option value="ranking">Rangordningsfråga</option>';
            newContent += '</select>';
            newContent += ' G<input id="gradeG" type="checkbox" name="gradeG" value="gradeG">';
            newContent += 'VG<input id="gradeVg" type="checkbox" name="gradeVg" value="gradeVg">';
            newContent += '<button class="delete" id="removeBoxQ">Ta bort</button></p></section>';

        $(this).before(newContent);

    });

    $content.on('click', '#removeBoxQ', function () {
       $(this).closest('.boxQ').detach();
    });

    $content.on('focus', '#lastDate', function () {
        $(this).datepicker({
            dateFormat: "yy-mm-dd"
        });
    });

    $content.on('click', '#newQuestion, .typeOfQuestion, .amountOfAlternatives, .amountOfAlternativesRank', function () {
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
        return false;
    });
});