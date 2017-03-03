/**
 * Created by Jonas Johansson, Java2, on 2017-02-24.
 * Shows buttons for add/del student, teacher and admin on adminpage.
 */
$(document).ready( function () {
    $('#student').click(function () {
        var newContent = '';
        newContent += '<button id="addStudent">Lägg till student</button>';
        newContent += '<button id="delStudent">Ta bort student</button>';
        $('#newButtons').html(newContent);
    });

    $('#teacher').click(function () {
        var newContent = '';
        newContent += '<button id="addTeacher">Lägg till lärare</button>';
        newContent += '<button id="delTeacher">Ta bort lärare</button>';
        $('#newButtons').html(newContent);
    });

    $('#admin').click(function () {
        var newContent = '';
        newContent += '<button id="addAdmin">Lägg till admin</button>';
        newContent += '<button id="delAdmin">Ta bort admin</button>';
        $('#newButtons').html(newContent);
    });
});