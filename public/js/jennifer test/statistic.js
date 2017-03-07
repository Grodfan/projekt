/**
 * Created by jennifergisslow on 2017-03-05.
 */

$('#resultAndStatistic').click(function () {

    var $printInContent = $('#content');

    var newContent = '';

    $.get('http://127.0.0.1:8000/select*test/', function (result) {
        for (var i in result){
            $.get('http://127.0.0.1:8000/getStatistics/', { testID: result[i].testId}, function (testRes) {
                console.log(testRes);

                newContent += '<section class=box>';
                newContent += '<h2>' + testRes.testName + '</h2>';
                newContent += '<p>Max antal frågor på testet: ' + testRes.maxQuestions + '</p>';
                newContent += '<p>Antalet frågor med nivå Godkänt: ' + testRes.amountGQuestions + ' || ' + ' Antalet frågor med nivå Väl Godkänt: ' + testRes.amountVGQuestions + '</p>';
                newContent += '<p>Antalet elever som kan göra provet: ' + testRes.maxDone + '</p>';
                newContent += '<p>Antalet elever som har gjort provet: ' + testRes.numDone + '</p>';
                newContent += '<p>Tiden varje elev har på sig att göra testet: ' + testRes.testTime + ' Minuter ' + '</p>';
                newContent += '<p>Är provet självrättande: ' + testRes.selfCorrectingTest + ' || ' + ' Kan eleven se resultatet direkt efter att provet är inlämnat: ' + testRes.abelToSeeTestResultAfter + '</p>';
                newContent += '<p>Testet kan göras under följande datum: ' + testRes.lastTestDate + '</p>';
                newContent += '</section>';
                $printInContent.html(newContent);
            });
        }
    });

});
