/**
 * Created by jennifergisslow on 2017-02-27.
 */

//Prints all the test in the database in content, admin.
$(document).ready(function () {
    var testBoxContent = $('#content');
    var newContent = '';

    var allTests = 'Ett nytt test';

    newContent += '<h3><u>Alla test: </u></h3>';
    for (i = 0; i <= 5; i++){
        newContent += '<a href="">' + allTests + '</a>';
        console.log(allTests);
    }

    testBoxContent.html(newContent);
    console.log(newContent);
})