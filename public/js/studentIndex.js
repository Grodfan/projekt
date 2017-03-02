/**
 * Created by jennifergisslow on 2017-02-27.
 */

console.log('läser scriptet');


$(document).ready(function () {
    var welcomeContent = $('#greetingContent');
    var testBoxContent = $('#content');
    var newContent = '';

    //All this will be collected from the database, this is just testdata.
    var testId;
    var testName = '';

    var selfCorrectingTest = 'false';
    var maxResult = 20;
    var studentResult = 10;
    var amountQuestions = 5;
    var activeQuestion = 1;

    //This part will be shown on the page when loading it the first time.

    // fix a for-loop that prints all the test in the variabel
    //Need to collect all the test for this student here
    var allTests = 10;

    newContent += '<h1>Välkommen</h1>';
    newContent += '<input type="submit" value="Se resultat på alla självrättande test">';

    welcomeContent.html(newContent);

    newContent = '';

    newContent += '<h3><u>Test du kan göra: </u></h3>';
    $.get('http://127.0.0.1:8000/select*test/', function (result) {

        var newTestForTheStudent = '';


        for (var i in result) {
            var attribute = result[i];

            testId+=attribute.TestId;
            testName+=attribute.Name;

                newContent+='<button ' + 'class="newTest">' + attribute.Name + '</button>';
        }

        testBoxContent.html(newContent);

        console.log(testId);
        console.log(testName);

    });

    console.log(testName);

    //get the selected test from database.
    $('.newTest').click(function () {

        newContent = '';



        console.log('klickat på ett test');

        newContent += '<h2>' + testName + '</h2>' ;
        newContent += '<p id="whatQuestionOfMaxQuestion">' + 'Fråga ' + activeQuestion + ' av ' + amountQuestions +'</p>';
        newContent += '<article class="grid-50 mobile-grid-100 tablet-grid-50 questionDesign"><p id="questionText">Detta är frågan, vad är ditt svar?</p></article>';
        newContent += '<article class="grid-50 mobile-grid-100 tablet-grid-50 questionDesign"><p id="alternativesForTheQuestion">Detta är dina alternativ.</p></article>';
        newContent += '<p id="timeLeft">Detta är tiden du har kvar att avsluta tiden på</p>';
        newContent += '<input id="nextQuestion" type="submit" value="Nästa"><input id="finishTest" type="submit" value="Avsluta test">';

        testBoxContent.html(newContent);

        $('#nextQuestion').click(function () {
            console.log('nästa fråga');

            activeQuestion++;
            newContent = '';

            if(activeQuestion === amountQuestions){

                console.log('sista frågan');

                newContent += '<h2>' + testName + '</h2>' ;
                newContent += '<p id="whatQuestionOfMaxQuestion">' + 'Fråga ' + activeQuestion + ' av ' + amountQuestions +'</p>';
                newContent += '<article class="grid-50 mobile-grid-100 tablet-grid-50 questionDesign"><p id="questionText">Detta är frågan, vad är ditt svar?</p></article>';
                newContent += '<article class="grid-50 mobile-grid-100 tablet-grid-50 questionDesign"><p id="alternativesForTheQuestion">Detta är dina alternativ.</p></article>';
                newContent += '<p id="timeLeft">Detta är tiden du har kvar att avsluta tiden på</p>';
                newContent += '<input id="nextQuestion" type="submit" value="Nästa"><input id="finishTest" type="submit" value="Avsluta test">';

                testBoxContent.html(newContent);
                $('#nextQuestion').hide();

            }

        });

        $('#finishTest').click(function () {

            console.log('clickad');
            var newContent = '';

            if (selfCorrectingTest === 'true'){

                newContent += '<p>Ditt resultat: ' + studentResult + ' ' + 'av' + ' ' + maxResult + '</p>';
                newContent += '<p>Se dina svar nedan: </p>';
                newContent += '<p>här ska alla svar visas</p>';
                newContent += '<input id="home" type="submit" value="Huvudsidan">';

                testBoxContent.html(newContent);
                console.log(newContent);

                $('#testContent').hide();
            }

            else if (selfCorrectingTest === 'false'){

                newContent += '<p>Prover har skickats in.</p>';
                newContent += '<p>Ditt resultat och betyg kommer att synas på portalen så fort det är rättat!</p>';
                newContent += '<input id="home" type="submit" value="Huvudsidan">';

                testBoxContent.html(newContent);
                console.log(newContent);

                $('#testContent').hide();
            }

            $('#home').click(function () {
                console.log('vill tillbaka till huvudsidan!');
            })

        });

    });

});

/*Functions that prints out correct data on the result page when clicking on the button 'avsluta test'

$(document).ready(function () {
    var $content= $('#content');

    //Get value from database!!!
    var selfCorrectingTest = 'false';
    var maxResult = 20;
    var studentResult = 10;

    $('#finishTest').click(function () {
        console.log('clickad');
        var newContent = '';

        if (selfCorrectingTest === 'true'){

            newContent += '<p>Ditt resultat: ' + studentResult + ' ' + 'av' + ' ' + maxResult + '</p>';
            newContent += '<p>Se dina svar nedan: </p>';

            $content.html(newContent);
            console.log(newContent);

            $('#testContent').hide();
        }

        else if (selfCorrectingTest === 'false'){

            newContent += '<p>Prover har skickats in.</p>';
            newContent += '<p>Ditt resultat och betyg kommer att synas på portalen så fort det är rättat!</p>';

            $content.html(newContent);
            console.log(newContent);

            $('#testContent').hide();
        }
    })

});*/