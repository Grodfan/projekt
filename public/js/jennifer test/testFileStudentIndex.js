/**
 * Created by jennifergisslow on 2017-03-01.
 */

$(document).ready(function () {

    //The updating part of the page will be shown in this part
    var testBoxContent = $('#content');
    var welcomeContent = $('#greetingContent');
    var testTimer = $('#timeTest');

    var newContent = '';

    var activeStudent = 'Student1@student.se';
    var activeId = '';
    var activeTestId = '';
    var activeTestName = '';
    var activeButtonId = '';

    var activeQuestion = 0;
    var maxAmountOfQuestions = [];
    var activeTypeOfQuestion = '';
    var activeQuestionId = 0;

    var activeAnswerStatus = '';
    var amountOfAnswers = [];

    var selfCorrecting = '';
    var seeTest = '';

    var inputTimeInMin = '';
    var time = '';
    var hour, min, sec;



    //Variabel to all the attributes from the functions.

    newContent += '<h1>Välkommen</h1>';
    newContent += '<input type="submit" value="Se resultat på alla självrättande test">';

    welcomeContent.html(newContent);


    //Första funktionen
    $.get('http://127.0.0.1:8000/select*student/', function (result) {

        for (var i in result) {
            var attribute = result[i];

            var e_mail = attribute.email;

            if (e_mail === activeStudent){
                console.log(e_mail);
                activeId = attribute.studentId;
            }
        }

        console.log(activeId);

    });

    //Tredje funktionen
    $.get('http://127.0.0.1:8000/select*studenttests/', function (result) {

        for (var i in result) {
            var attribute = result[i];

            var studentId = attribute.StudentId;

            if (studentId === activeId){
                activeTestId += attribute.TestId;
                console.log('Jag kommer hit');

            }

        }
        console.log(activeId);
        console.log(activeTestId);
        console.log(activeTestId.length);

    });

    //Andra funktionen
    $.get('http://127.0.0.1:8000/select*test/', function(result) {

        newContent = '';

        newContent += '<h3><u>Test du kan göra: </u></h3>';


        for (var i in result) {
            var attribute = result[i];

            var testId = attribute.testId;

            for(var j = 0; j < activeTestId.length; j++){

                if (activeTestId[j] == testId){
                    console.log('äntligen');
                    activeTestName = attribute.testName;

                    newContent += '<button class="testButton" id="'+testId+'">'+activeTestName+'</button>';
                    console.log(activeTestName);
                }

            }

            console.log(testId);

        }

        testBoxContent.html(newContent);
        console.log('Detta är test-funktionen');


        //Fjärde funktionen
        $('.testButton').click(function () {

            activeButtonId = $(this).attr("id");

            newContent = '';

            $.get('http://127.0.0.1:8000/select*test/', function (result) {
                for (var i in result) {
                    var attributeTest = result[i];

                    //Om id på det test som du vill hämta matchar så hämtar du frågor och svar!
                    if (attributeTest.testId == activeButtonId) {

                        inputTimeInMin = attributeTest.timeForTestMINUTES;
                        selfCorrecting = attributeTest.selfCorrect;
                        seeTest = attributeTest.seeTestAfter;

                        activeTestName = attributeTest.testName;

                        newContent += '<h2>' + activeTestName + '</h2>';
                        testBoxContent.html(newContent);
                        console.log(attributeTest.testId);
                    }
                }
                time = inputTimeInMin * 60000;
            });

            //HÄMTA ALLA FRÅGOR TILL testet
            $.get('http://127.0.0.1:8000/select*question/', function (result) {
                for (var i in result) {
                    var attributeQuestion = result[i];
                    //OM FRÅGAN ÄR HAR ID SOM ÄR TILL DETTA TESTTET
                    if (attributeQuestion.testId == activeButtonId) {

                        maxAmountOfQuestions+=attributeQuestion.questionId;
                        activeQuestionId = maxAmountOfQuestions[0].valueOf();

                        if(maxAmountOfQuestions[activeQuestion].valueOf() == activeQuestionId && maxAmountOfQuestions.length == activeQuestion+1){
                            console.log('detta skrivs endast en gång');
                            activeTypeOfQuestion = attributeQuestion.typeOfQuestion;
                            newContent += '<article class="grid-50 mobile-grid-100 tablet-grid-50 questionDesign"><p id="questionText">' + attributeQuestion.questionText + '</p></article>';
                        }
                    }
                }
                testBoxContent.html(newContent);
            });

            $.get('http://127.0.0.1:8000/select*answers/', function (result) {
                newContent +='<article class="grid-50 mobile-grid-100 tablet-grid-50 questionDesign">';
                for (var i in result) {
                    var attributeAnswer = result[i];

                    if (activeQuestionId == attributeAnswer.questionId){
                        console.log('det stämmer');
                        if (activeTypeOfQuestion === 'multiple' || activeTypeOfQuestion === 'alternative'){
                            console.log('multiple eller alternative');
                            newContent += '<p id="alternativesForTheQuestion">' + attributeAnswer.answerText + '<input id="answerBox" type="checkbox" name="answerBox" value="answerBox">' + '</p>';
                        }
                        else if (activeTypeOfQuestion === 'ranking') {
                            console.log('ranking');
                            newContent += '<p id="alternativesForTheQuestion">' + attributeAnswer.answerText + '</p>';
                        }
                    }
                }
                newContent += '</article>';
                newContent += '<p>Fråga ' + (activeQuestion+1) + ' av ' + maxAmountOfQuestions.length + '</p>';
                if (activeQuestion + 1 < maxAmountOfQuestions.length){
                    newContent += '<input id="nextQuestion" type="submit" value="Nästa"><input id="finishTest" type="submit" value="Avsluta test">';
                }
                else{
                    newContent += '<input id="finishTest" type="submit" value="Avsluta test">';
                }

                testBoxContent.html(newContent);

                //Clicking on the next button
                $(document).on('click', '#nextQuestion', function () {
                    console.log('nästa fråga');

                    activeQuestion++;
                    activeQuestionId++;

                    console.log(activeQuestion);

                    newContent = '';

                    $.get('http://127.0.0.1:8000/select*test/', function (result) {

                        for (var i in result) {
                            var attributeTest = result[i];

                            //Om id på det test som du vill hämta matchar så hämtar du frågor och svar!
                            if (attributeTest.testId == activeButtonId) {

                                newContent += '<h2>' + activeTestName + '</h2>';

                                console.log(attributeTest.testId);

                                testBoxContent.html(newContent);

                            }

                        }

                    });

                    //HÄMTA ALLA FRÅGOR TILL testet
                    $.get('http://127.0.0.1:8000/select*question/', function (result) {
                        for (var i in result) {
                            var attributeQuestion = result[i];

                            //OM FRÅGAN ÄR HAR ID SOM ÄR TILL DETTA TESTTET
                            if (maxAmountOfQuestions[activeQuestion].valueOf() == attributeQuestion.questionId) {

                                activeQuestionId = maxAmountOfQuestions[activeQuestion].valueOf();
                                activeTypeOfQuestion = attributeQuestion.typeOfQuestion;
                                newContent += '<article class="grid-50 mobile-grid-100 tablet-grid-50 questionDesign"><p id="questionText">' + attributeQuestion.questionText + '</p></article>';

                            }
                        }
                        testBoxContent.html(newContent);
                    });

                    $.get('http://127.0.0.1:8000/select*answers/', function (result) {
                        newContent +='<article class="grid-50 mobile-grid-100 tablet-grid-50 questionDesign">';
                        for (var i in result) {
                            var attributeAnswer = result[i];

                            if (activeQuestionId == attributeAnswer.questionId){
                                console.log('det stämmer');
                                if (activeTypeOfQuestion === 'multiple' || activeTypeOfQuestion === 'alternative'){
                                    console.log('multiple eller alternative');
                                    newContent += '<p id="alternativesForTheQuestion">' + attributeAnswer.answerText + '<input id="answerBox" type="checkbox" name="answerBox" value="answerBox">' + '</p>';
                                }
                                else if (activeTypeOfQuestion === 'ranking'){
                                    newContent += '<p id="alternativesForTheQuestion">' + attributeAnswer.answerText + '</p>';
                                    console.log('ranking');
                                }
                            }
                        }
                        newContent += '</article>';
                            newContent += '<p>Fråga ' + (activeQuestion+1) + ' av ' + maxAmountOfQuestions.length + '</p>';
                            if (activeQuestion + 1 < maxAmountOfQuestions.length){
                                newContent += '<input id="nextQuestion" type="submit" value="Nästa"><input id="finishTest" type="submit" value="Avsluta test">';
                            }
                            else{
                                newContent += '<input id="finishTest" type="submit" value="Avsluta test">';
                            }

                        testBoxContent.html(newContent);

                    });

                    });

                //Clicking on finish test button
                $(document).on('click', '#finishTest', function () {
                    console.log('klickar på avsluta test');

                    newContent = '';

                    if (selfCorrecting === 'true' && seeTest === 'false'){
                        console.log('självrättande ja, se resultat nej');

                        newContent += '<h2 class="testName">' + activeTestName + '</h2>';
                        newContent += '<p>Prover har skickats in.</p>';
                        newContent += '<p>Ditt resultat och betyg kommer att synas på portalen när tiden för provet har gått ut!</p>';
                        newContent += '<input id="homePage" type="submit" value="Huvudsidan">';
                    }
                    else if (selfCorrecting === 'true' && seeTest === 'true'){
                        console.log('självrättande ja, se resultat ja');

                        newContent += '<h2 class="testName">' + activeTestName + '</h2>';
                        newContent += '<p id="resultText"> 10 rätt av 25 möjliga</p>';
                        newContent += '<p>Se rätt svar nedan:</p>';
                        newContent += '<p class="theResults"> varje fråga med rätt och fel svar</p>';
                        newContent += '<input id="homePage" type="submit" value="Huvudsidan">';
                    }

                    else if (selfCorrecting === 'false' && seeTest === 'false'){
                        console.log('självrättande nej, se resultat nej');

                        newContent += '<h2 class="testName">' + activeTestName + '</h2>';
                        newContent += '<p>Prover har skickats in.</p>';
                        newContent += '<p>Ditt resultat och betyg kommer att synas på portalen så fort provet är rättat!</p>';
                        newContent += '<input id="homePage" type="submit" value="Huvudsidan">';
                    }

                    testBoxContent.html(newContent);

                    $('#homePage').click(function () {
                        console.log('reagerar');
                        location.reload();
                    });

                });

                });

            var startTimer = setInterval(function () {

                hour = Math.floor(time / 3600000);
                min = Math.floor(time % 3600000 / 60000);
                sec = time % 3600000 % 60000 / 1000;

                testTimer.text("Hour: " + hour + " Min: " + min + " Sek: " + sec);

                if (time <= 0){
                    testTimer.hide();
                    $('#nextQuestion').hide();
                    $('#finishTest').show();
                    clearInterval(startTimer);
                }

                time -= 1000;

            }, 1000);

        });

    });

    //Avslut på dokument-funktionen!!

});