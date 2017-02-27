/**
 * Created by jennifergisslow on 2017-02-27.
 */

console.log('läser scriptet');

$(document).ready(function () {
    var welcomeContent = $('#greetingContent');
    var testBoxContent = $('#testBoxContent');
    var newContent = '';

    // fix a for loop that prints all the test in the variabel
    //Need to collect all the test for this student here
    var allTests = 'Ett nytt test';

    newContent += '<h1>Välkommen</h1>';
    newContent += '<input type="submit" value="Se resultat på alla självrättande test">';

    welcomeContent.html(newContent);
    console.log(newContent);

    newContent = '';
    console.log(newContent);

    newContent += '<h3><u>Test du kan göra: </u></h3>';
    for (i = 0; i <= 5; i++){
        newContent += '<a href="">' + allTests + '</a>';
        console.log(allTests);
    }

    testBoxContent.html(newContent);
    console.log(newContent);

});

/*Functions that prints out correct data on the result page when clicking on the button 'avsluta test'*/

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

});