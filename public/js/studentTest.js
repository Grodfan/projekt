/**
 * Created by Jonas on 2017-03-04.
 */
var questionsData;
var questionAnswers;
var testData;
var currentTestId;
var studentId;
var testsDone;

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
    var testDone = false;

    $.post('http://127.0.0.1:8000/getStudentId/',sqlEmail, function (data) {
        studentId = data[0].studentId;
    });




    $content.empty();

    $.post('http://127.0.0.1:8000/getStudentTest/',sqlEmail, function (data) {
        var sqlStudentId = {'StudentId'  : studentId };
        $.post('http://127.0.0.1:8000/getStudentTestsDone/',sqlStudentId, function (testsDoneStudent) {
            console.log(testsDoneStudent)
        testData = data;
        for (var i in data) {
            testDone = false;

            newContent += '<section class="box"><ul>';
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



                    for(var j = 0; j < testsDoneStudent.length; j++){
                        if(testsDoneStudent[j].TestId == data[i].testId){
                            newContent += '<button class="testResult">Result</button>';
                            testDone = true;
                            break;
                        }
                    }
        if(testDone === false){
            if(currentDay === data[i].lastDate){
                newContent += '<button class="start">Starta</button>';
            }
        }



            newContent += '</ul></section>';
        }

        $content.append(newContent);
        $content.find('.testIdValue').hide();
    });
});
    $content.on('click', '.start', function () {

       $content.empty();
        var $selectedElement = $(this);
        var selectedTestId = $selectedElement.parent().find(".testIdValue").text();
        var sqlTestId = {'testId' : selectedTestId};
        currentTestId = selectedTestId;
        var newContent = '';

        $.post('http://127.0.0.1:8000/getStudentTestQuestions/',sqlTestId,function (data) {
            var typeOfQuestion;
            var grade = 'G';
            questionsData = returnQuestions(data);
            var sqlQid = {'questionId':questionsData[0].questionId};
            $.post('http://127.0.0.1:8000/getQuestionsAnswers/',sqlQid,function (dataQ) {


            newContent += '<section class=boxTest id="qContent">';
            newContent += '<p>Fråga ' + (counter+1 + ' / ' + (questionsData.length));

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
                        newContent += '<p>' + dataQ[i].answerText + '<input class="studentAnswer" type="checkbox" value=' + dataQ[i].answersId + ' /></p>';
                    }
                }
                else if(data[0].typeOfQuestion === 'alternative'){
                    for(var i = 0; i < dataQ.length; i++){
                        newContent += '<p>' + dataQ[i].answerText + '<input class="studentAnswer" type="checkbox" value=' + dataQ[i].answersId + ' /></p>';
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
            newContent += '<span class="floatRight" id="time"></span>';

            $content.append(newContent);
            $('#sortable').sortable({axis: "y"});

            });

            for(var i = 0; i < testData.length; i++){

                if(testData[i].testId == selectedTestId){
                    countdown(testData[i].timeForTestMINUTES)
                }
            }
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
                        newContent += '<p>' + data[i].answerText + '<input class="studentAnswer" type="checkbox" value=' + data[i].answersId + ' /></p>';
                    }
                }
                else if(questionsData[counter].typeOfQuestion === 'alternative'){
                    for(var i = 0; i < data.length; i++){
                        newContent += '<p>' + data[i].answerText + '<input class="studentAnswer" type="checkbox" value=' + data[i].answersId + ' /></p>';
                    }
                }
                else if(questionsData[counter].typeOfQuestion === 'ranking'){
                    newContent += '<ul id="sortable">';

                    for(var i = 0; i < data.length; i++){
                        newContent += '<li class="boxRanking">' + data[i].answerText + '</li></p>';
                    }

                    newContent += '</ul>';
                }

            $content.find('#qContent').append(newContent);
                $('#sortable').sortable({axis: "y"});

            });
        }
    });

    $content.on('click', '#nextQuestion', function () {

        for(var j = 0; j < $('.boxTest .studentAnswer').length; j++ ){
            if($('.boxTest .studentAnswer').eq(j).is(':checked')) {
                var answersId = $('.boxTest .studentAnswer').eq(j).val();
                var questionId = questionsData[counter].questionId;
                var sql = {"StudentId": studentId ,"TestId": parseInt(currentTestId) ,"QuestionId": questionId ,"AnswersId": parseInt(answersId)};

                $.post('http://127.0.0.1:8000/studentAnswers/',sql,function (data) {});
            }
        }

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
                        newContent += '<p>' + data[i].answerText + '<input class="studentAnswer" type="checkbox" value=' + data[i].answersId + ' /></p>';
                    }
                }
                else if(questionsData[counter].typeOfQuestion === 'alternative'){
                    for(var i = 0; i < data.length; i++){
                        newContent += '<p>' + data[i].answerText + '<input class="studentAnswer" type="checkbox" value=' + data[i].answersId + ' /></p>';
                    }
                }
                else if(questionsData[counter].typeOfQuestion === 'ranking'){
                    newContent += '<ul id="sortable">';

                    for(var i = 0; i < data.length; i++){
                        newContent += '<li class="boxRanking studentAnswer" value=' + data[i].answersId + '>' + data[i].answerText + '</li>';
                    }

                    newContent += '</ul>';
                }

            $content.find('#qContent').append(newContent);
                $('#sortable').sortable({axis: "y"});
            });
        }

    });

    $content.on('click','#endTest', function () {
        testEnd();
    });
});

function returnQuestions(data){
    return data;
}

function countdown(minutes){
    var $content = $('#content');
    var $time = $('#time');
    var time = minutes * 60000;
    var hour, min, sec;

    var startTimer = setInterval(function () {
        $content.find('#time').empty();
        hour = Math.floor(time / 3600000);
        min = Math.floor(time % 3600000 / 60000);
        sec = time % 3600000 % 60000 / 1000;

        $content.find('#time').append("Tim: " + hour + " Min: " + min + " Sek: " + sec);

        if (time <= 0){
          //  $content.find('#time').empty();
            //$content.find('#time').append("Tiden ute!");
            clearInterval(startTimer);
            testEnd();
        }

        time -= 1000;

    }, 1000);
}

function testEnd() {
    var $content = $('#content');
    $content.empty();
    var newContent = '';
    var sql = {'StudentId': studentId};
    var points = 0;
    var pointsG = 0;
    var pointsVg = 0;
    var totalGquestions = 0;
    var totalVgQuestions = 0;

    if (testData[currentTestId - 1].seeTestAfter === 'true') {

        $.post('http://127.0.0.1:8000/getStudenAnswers/',sql,function (getStudentAnswers) {
            for(var i = 0; i < getStudentAnswers.length; i++){
                if(getStudentAnswers[i].TestId == currentTestId){
                    var sqlGetAnswer = {'answersId':getStudentAnswers[i].AnswersId};
                        $.post('http://127.0.0.1:8000/getRightAnswers/',sqlGetAnswer,function (getRightAnswers) {

                            if(getRightAnswers[0].answerStatus === 'true'){
                                var sqlGrade = {'questionId': getRightAnswers[0].questionId};
                                $.post('http://127.0.0.1:8000/getGrades/',sqlGrade,function (getGrades) {

                                    points++;

                                        if(getGrades[0].gradeG === 'true'){
                                            pointsG++;
                                        }
                                        else if(getGrades[0].gradeVg === 'true') {
                                            pointsVg++;
                                        }

                                        var procent = (points/questionsData.length)*100;
                                        var procentG = (pointsG/points)*100;
                                        var procentVg = (pointsVg/points)*100;

                                        var grade = 'IG';

                                            if((procentG + procentVg) > 80){
                                                grade = 'VG';
                                            }
                                            else if(procentG > 60){
                                                grade = 'G';
                                            }

                                    $content.empty();
                                    var newContent = '';
                                    newContent += '<section class="box">';
                                    newContent += '<p>Antal rätt ' + points + ' av ' + questionsData.length +'</p>';
                                    newContent += '<p>Godkänt: ' + pointsG + '</p>';
                                    newContent += '<p>Väl Godkänt: ' + pointsVg + '</p>';
                                    newContent += 'Betyg: ' + grade;
                                    newContent += '</section>';
                                    $content.append(newContent);
                                });
                            }
                         });
                }
            }
        });
    }
    else if (testData[currentTestId - 1].seeTestAfter === 'false') {
        newContent += '<section class="box">';
        newContent += '<p>Tack för din medverkan!</p>';
        newContent += '</section>';
        $content.append(newContent);
    }
}



/*
 function returnAnswers(sql) {
 //var answers;
 $.post('http://127.0.0.1:8000/getQuestionsAnswers/',sql,function (data) {
 questionAnswers = data;

 console.log(questionAnswers);
 //return answers;
 });
 }*/
