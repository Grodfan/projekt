/**
 * Created by Jonas Johansson, Java2, on 2017-02-24.
 * Adds add/del teacherform on adminpage in id content.
 */
$(document).ready(function () {
    var $content = $('#content');
    var $newButtons = $('#newButtons');

    $newButtons.on ('click','#addTeacher',function () {
        var newContent = '';

        newContent += '<form id="newTeacher" method="post">';
        newContent += '<p><label>Ny lärare</label></p>';
        newContent += '<p><input type="text" id="firstName" name="firstName" placeholder="Förnamn"/></p>';
        newContent += '<p><input type="text" id="lastName" name="lastName" placeholder="Efternamn"/></p>';
        newContent += '<p><input type="email" id="email" name="email" placeholder="Email"/></p>';
        newContent += '<p><input type="text" id="password" name="password" placeholder="Lösenord"/></p>';
        newContent += '<p><input type="submit" value="Lägg till"/> </p>';
        newContent += '</form>';

    $content.html(newContent);
    });

    $newButtons.on ('click', '#delTeacher', function () {
        var newContent = '';

        newContent += '<form method="post">';
        newContent += '<p><input type="email" id="email" name="email" placeholder="Email"></p>';
        newContent += '<p><input type="submit" value="Ta bort"></p>';
        newContent += '</form>';

    $content.html(newContent);
    });
});