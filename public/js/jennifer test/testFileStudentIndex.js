/**
 * Created by jennifergisslow on 2017-03-01.
 */

$(document).ready(function () {

    //The updating part of the page will be shown in this part
    var testBoxContent = $('#content');
    var welcomeContent = $('#greetingContent');

    var newContent = '';

    var activeStudent = 'StudentEmail1';
    var activeId;
    var activeTestId = '';
    var activeTestName = '';
    var activeButtonId = '';

    var activeQuestion = 1;
    var maxAmountOfQuestions = [];
    var activeTypeOfQuestion = [];
    var activeQuestionText = '';
    var activeQuestionId = [];

    var activeAnswerStatus = '';
    var activeAnswerText = '';



    //Variabel to all the attributes from the functions.

    newContent += '<h1>Välkommen</h1>';
    newContent += '<input type="submit" value="Se resultat på alla självrättande test">';

    welcomeContent.html(newContent);


    //Första funktionen
    $.get('http://127.0.0.1:8000/select*student/', function (result) {

        for (var i in result) {
            var attribute = result[i];

            var e_mail = attribute.email;

            if (activeStudent === e_mail){
                activeId = attribute.StudentId;
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

            console.log(testId + 'hej');

            for(var j in result){

                if (activeTestId[j] == testId){
                    console.log('äntligen');
                    activeTestName = attribute.testName;

                    newContent += '<button class="newTest" id="'+testId+'">'+activeTestName+'</button>';
                    console.log(activeTestName);
                }

            }

            console.log(testId);

        }

        testBoxContent.html(newContent);
        console.log('Detta är test-funktionen');


        //Fjärde funktionen
        $('.newTest').click(function () {

            console.log('jag har tryckt på knappen');

            activeButtonId = $(this).attr("id");

            console.log(activeButtonId);

            newContent = '';

            $.get('http://127.0.0.1:8000/select*test/', function (result) {

                for (var i in result) {
                    var attributeTest = result[i];

                    //Om id på det test som du vill hämta matchar så hämtar du frågor och svar!
                    if (attributeTest.testId == activeButtonId) {

                        console.log(attributeTest.testId);


                        //HÄMTA ALLA FRÅGOR TILL testet
                        $.get('http://127.0.0.1:8000/select*question/', function (result) {
                            for (var i in result) {
                                var attributeQuestion = result[i];

                                //OM FRÅGAN ÄR HAR ID SOM ÄR TILL DETTA TESTTET
                                if (attributeQuestion.testId == activeButtonId) {



                                    console.log(attributeQuestion.testId);


                                    $.get('http://127.0.0.1:8000/select*answers/', function (result) {
                                        for (var i in result) {
                                            var attributeAnswer = result[i];

                                            if (attributeQuestion.QuestionId == attributeAnswer.QuestionId) {

                                                newContent += '<article class="grid-50 mobile-grid-100 tablet-grid-50 questionDesign"><p id="alternativesForTheQuestion">' + attributeAnswer.AnswerText +' </p></article>';

                                                console.log(attributeQuestion.QuestionId);

                                                console.log(attributeAnswer.QuestionId);
                                                //HÄMTA UT SSVAR TILL FRÅGA
                                            }

                                        }

                                        testBoxContent.html(newContent);

                                    });


                                }


                            }

                        });


                    }


                }

            });



            /*for(var i in result){
                attribute = result[i];

                testId = attribute.testId;

                console.log('jag kommer hit ');
                if (activeButtonId == testId){
                    activeTestName = attribute.testName;
                    console.log(activeTestName);
                }

            }

            newContent += '<h2>' + activeTestName + '</h2>' ;
            newContent += '<p id="whatQuestionOfMaxQuestion">' + 'Fråga ' + activeQuestion + ' av ' + maxAmountOfQuestions.length +'</p>';
            newContent += '<p id="timeLeft">Detta är tiden du har kvar att avsluta tiden på</p>';
            if (activeQuestion == maxAmountOfQuestions.length){
                newContent += '<input id="finishTest" type="submit" value="Avsluta test">';
            }
            else{
                newContent += '<input id="nextQuestion" type="submit" value="Nästa"><input id="finishTest" type="submit" value="Avsluta test">';
            }

            console.log(activeButtonId);
            testBoxContent.html(newContent);

            $('#nextQuestion').click(function () {
                activeQuestion++;
                console.log(activeQuestion);
            }); */

        });

    });

    //Avslut på dokument-funktionen!!

});

/*
newContent += '<h2>' + testName + '</h2>' ;
newContent += '<p id="whatQuestionOfMaxQuestion">' + 'Fråga ' + activeQuestion + ' av ' + maxAmountOfQuestions.length +'</p>';
newContent += '<article class="grid-50 mobile-grid-100 tablet-grid-50 questionDesign"><p id="questionText">Detta är frågan, vad är ditt svar?</p></article>';
newContent += '<article class="grid-50 mobile-grid-100 tablet-grid-50 questionDesign"><p id="alternativesForTheQuestion">Detta är dina alternativ.</p></article>';
newContent += '<p id="timeLeft">Detta är tiden du har kvar att avsluta tiden på</p>';
newContent += '<input id="nextQuestion" type="submit" value="Nästa"><input id="finishTest" type="submit" value="Avsluta test">';
    */

/*
 console.log('jag kommer hit ');
 if (activeButtonId == testId){
 activeTestName = attribute.testName;
 console.log(activeTestName);
 newContent += '<h2>' + activeTestName + '</h2>' ;
 newContent += '<p id="whatQuestionOfMaxQuestion">' + 'Fråga ' + activeQuestion + ' av ' + maxAmountOfQuestions.length +'</p>';
 newContent += '<article class="grid-50 mobile-grid-100 tablet-grid-50 questionDesign"><p id="questionText">' + activeQuestionText + '</p></article>';
 // newContent += '<article class="grid-50 mobile-grid-100 tablet-grid-50 questionDesign"><p id="alternativesForTheQuestion">' + activeAnswerText[i] +' </p></article>';
 // newContent += '<p id="timeLeft">Detta är tiden du har kvar att avsluta tiden på</p>';
 if (activeQuestion == maxAmountOfQuestions.length){
 newContent += '<input id="finishTest" type="submit" value="Avsluta test">';
 }
 else{
 newContent += '<input id="nextQuestion" type="submit" value="Nästa"><input id="finishTest" type="submit" value="Avsluta test">';
 }
 }
*/