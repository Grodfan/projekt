/**
 * Created by Jonas on 2017-03-04.
 */
var questionsData;

$(document).ready(function () {
    var $content = $('#content');
    var studentEmail = sessionStorage.getItem('studentEmail');
    var sqlEmail = {'email': studentEmail};
    var newContent = '';
    var selfCorrect = '';
    var seeTestAfter = '';
    var date = new Date();
    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth()+1)).slice(-2);
    var currentDay = date.getFullYear() + '-'+ month + '-' + day;
    var counter = 0;

    $content.empty();

    $.post('http://127.0.0.1:8000/getStudentTest/',sqlEmail, function (data) {
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

                if(currentDay === data[i].lastDate){
                    newContent += '<button class="start">Starta</button>';
                }

            newContent += '</ul></section>';
        }

        $content.append(newContent);
        $content.find('.testIdValue').hide();
    });

    $content.on('click', '.start', function () {
       $content.empty();
        var $selectedElement = $(this);
        var selectedTestId = $selectedElement.parent().find(".testIdValue").text();
        var sqlTestId = {'testId' : selectedTestId};
        var newContent = '';

        $.post('http://127.0.0.1:8000/getStudentTestQuestions/',sqlTestId,function (data) {
            var typeOfQuestion;
            var grade = 'G';
            questionsData = returnQuestions(data);
            var sqlQid = {'questionId':questionsData[0].questionId};
            $.post('http://127.0.0.1:8000/getQuestionsAnswers/',sqlQid,function (dataQ) {


            newContent += '<section class=boxTest id="qContent">';
            newContent += '<p>Fråga ' + (counter+1 + ' / ' + (questionsData.length))

                if(data[0].gradeVg == 'true'){
                    grade = 'VG';
                }

            newContent += '<span class="floatRight">' + grade +'</span></p>';

                if(data[0].typeOfQuestion === 'multiple'){
                    typeOfQuestion = 'Flervalsfråga';
                }
                else if(data[0].typeOfQuestion === 'alternative' ){
                    typeOfQuestion = 'Alternativfråga';
                }
                else if(data[0].typeOfQuestion === 'ranking'){
                    typeOfQuestion = 'Rangordningsfråga';
                }

            newContent += '<p>' + typeOfQuestion + '</p>';
            newContent += data[0].questionText;

                if(data[0].typeOfQuestion === 'multiple' || 'alternative'){
                    for(var i = 0; i < dataQ.length; i++){
                        newContent += '<p>' + dataQ[i].answerText + '<input type="checkbox"/></p>';
                    }
                }
                else if(data[0].typeOfQuestion === 'alternative'){
                    for(var i = 0; i < dataQ.length; i++){
                        newContent += '<p>' + dataQ[i].answerText + '<input type="checkbox"/></p>';
                    }
                }
                else if(data[0].typeOfQuestion === 'ranking'){
                    newContent += '<ul id="sortable">';

                        for(var i = 0; i < dataQ.length; i++){
                         newContent += '<li class="boxRanking">' + dataQ[i].answerText + '</li>';
                        }

                    newContent += '</ul>';
                }

            newContent += '</section>';
            newContent += '<button class="previuosQuestion" id="previuosQuestion">Föregående</button>';
            newContent += '<button id="nextQuestion">Nästa</button>';
            newContent += '<button class="floatRight" id="endTest">Avsluta</button>';

            $content.append(newContent);
            $('#sortable').sortable({axis: "y"});
            //$('#sortable').disableSelection();
            });
        });
    });

    $content.on('click', '#previuosQuestion', function () {
        var newContent = '';

        if(counter > 0){
            $content.find('#qContent').empty();
            counter--;
            var sql = {'questionId':questionsData[counter].questionId};
            $.post('http://127.0.0.1:8000/getQuestionsAnswers/',sql,function (data) {

            var typeOfQuestion;
            var grade = 'G';

            newContent += '<p>Fråga ' + (counter+1 + ' / ' + (questionsData.length));

                if(questionsData[counter].gradeVg == 'true'){
                    grade = 'VG';
                }

            newContent += '<span class="floatRight">' + grade +'</span></p>';

                if(questionsData[counter].typeOfQuestion === 'multiple'){
                    typeOfQuestion = 'Flervalsfråga';
                }
                else if(questionsData[counter].typeOfQuestion === 'alternative' ){
                    typeOfQuestion = 'Alternativfråga';
                }
                else if(questionsData[counter].typeOfQuestion === 'ranking'){
                    typeOfQuestion = 'Rangordningsfråga';
                }

            newContent += '<p>' + typeOfQuestion + '</p>' ;
            newContent += questionsData[counter].questionText;

                if(questionsData[counter].typeOfQuestion === 'multiple'){
                    for(var i = 0; i < data.length; i++){
                        newContent += '<p>' + data[i].answerText + '<input type="checkbox"/></p>';
                    }
                }
                else if(questionsData[counter].typeOfQuestion === 'alternative'){
                    for(var i = 0; i < data.length; i++){
                        newContent += '<p>' + data[i].answerText + '<input type="checkbox"/></p>';
                    }
                }
                else if(questionsData[counter].typeOfQuestion === 'ranking'){
                    newContent += '<ul id="sortable">';

                    for(var i = 0; i < data.length; i++){
                        newContent += '<li class="boxRanking">' + data[i].answerText + '</li></p>';
                    }
                    console.log('hej');
                    newContent += '</ul>';
                }

            $content.find('#qContent').append(newContent);
                $('#sortable').sortable({axis: "y"});
               //$('#sortable').disableSelection();
            });
        }
    });

    $content.on('click', '#nextQuestion', function () {
        var newContent = '';

        if(counter < questionsData.length-1){
            $content.find('#qContent').empty();
            counter++;
            var sql = {'questionId':questionsData[counter].questionId};
            $.post('http://127.0.0.1:8000/getQuestionsAnswers/',sql,function (data) {

            var typeOfQuestion;
            var grade = 'G';

            newContent += '<p>Fråga ' + (counter+1 + ' / ' + (questionsData.length));

                if(questionsData[counter].gradeVg == 'true'){
                    grade = 'VG';
                }

            newContent += '<span class="floatRight">' + grade +'</span></p>';

                if(questionsData[counter].typeOfQuestion === 'multiple'){
                    typeOfQuestion = 'Flervalsfråga';
                }
                else if(questionsData[counter].typeOfQuestion === 'alternative' ){
                    typeOfQuestion = 'Alternativfråga';
                }
                else if(questionsData[counter].typeOfQuestion === 'ranking'){
                    typeOfQuestion = 'Rangordningsfråga';
                }

            newContent += '<p>' + typeOfQuestion + '</p>' ;
            newContent += questionsData[counter].questionText;

                if(questionsData[counter].typeOfQuestion === 'multiple'){
                    for(var i = 0; i < data.length; i++){
                        newContent += '<p>' + data[i].answerText + '<input type="checkbox"/></p>';
                    }
                }
                else if(questionsData[counter].typeOfQuestion === 'alternative'){
                    for(var i = 0; i < data.length; i++){
                        newContent += '<p>' + data[i].answerText + '<input type="checkbox"/></p>';
                    }
                }
                else if(questionsData[counter].typeOfQuestion === 'ranking'){
                    newContent += '<ul id="sortable">';

                    for(var i = 0; i < data.length; i++){
                        newContent += '<li class="boxRanking">' + data[i].answerText + '</li>';
                    }
                    console.log('hej');
                    newContent += '</ul>';
                }

            $content.find('#qContent').append(newContent);
                $('#sortable').sortable({axis: "y"});
                //$('#sortable').disableSelection();
            });
        }
    });

    $content.on('click','#endTest', function () {
        console.log('endTest');
    });
});

function returnQuestions(data){
    return data;
}



//useQustions();

/* for(var i = 0; i < data.length; i++){

 var typeOfQuestion;
 var grade = '';

 newContent += '<section class="box">';

 if(data[i].typeOfQuestion === 'multiple'){
 typeOfQuestion = 'Flervalsfråga';
 }
 else if(data[i].typeOfQuestion === 'alternative' ){
 typeOfQuestion = 'Alternativfråga';
 }
 else if(data[i].typeOfQuestion === 'ranking'){
 typeOfQuestion = 'Rangordningsfråga';
 }

 newContent += '<p>' + typeOfQuestion ;

 if(data[i].gradeG === 'true'){
 grade = 'G';
 }
 else if(data[i].gradeVg == 'true'){
 grade = 'VG';
 }

 newContent += '<span class="floatRight">' + grade +'</span></p>';

 newContent += data[i].questionText;
 newContent += '';
 newContent += '</section>';

 newContent += '';

 $content.append(newContent);

 }

 function getQuestions(id){
 $.post('http://127.0.0.1:8000/getStudentTestQuestions/',id,function (data) {
 questionsData = returnQuestions(data);

 });
 }

 function getQuestionAnswers(id){
 $.post('http://127.0.0.1:8000/getQuestionsAnswers/',id,function (data) {
 questionsAnswersData = returnQuestionsAnswers(data);
 });
 }

 function returnQuestionsAnswers(data) {
 return data;
 }

 var questionsAnswersData;
 */
