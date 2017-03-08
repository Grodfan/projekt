/**
 * Created by Jonas on 2017-03-02.
 * Formulär för att kunna lägga till och ta bort elev/admin/lärare från adminsidan.
 *
 */


$(document).ready(function () {
    var $content = $('#content');
    console.log('no?');

    $('#user').on ('click', function () {
        var newContent = '';
        $content.empty();

        newContent  += '<section class="boxQ">';
        newContent += '<select id="addDelUser" name="newUser">';
        newContent += '<option value="empty"></option>';
        newContent += '<option value="add">Lägg till</option>';
        newContent += '<option value="del">Ta bort</option>';
        newContent += '</select>';
        newContent += '<select id="selectUserType" name="newUser">';
        newContent += '<option value="empty"></option>';
        newContent += '<option value="student">Student</option>';
        newContent += '<option value="teacher">Lärare</option>';
        newContent += '<option value="admin">Admin</option>';
       // newContent += '<option value="klass">Klass</option>';
       // newContent += '<option value="courseCode">Kurskod</option>';
        newContent += '</select></section>';

        $content.append(newContent);
    });

    $content.on('click', '#selectUserType, #addDelUser', function () {

        var getSelectUserType = $('#selectUserType option:selected').val();
        var getAddDel = $('#addDelUser option:selected').val();
        var newContent = '';

        if((getSelectUserType === 'student') && (getAddDel === 'add')){

            $content.find('.box').detach();

            newContent  += '<section class="box">';
            newContent += '<form id="addStudent" method="post">';
            newContent += '<p><label>Ny student</label></p>';
            newContent += '<p><input type="text" id="firstName" name="firstName" placeholder="Förnamn"/></p>';
            newContent += '<p><input type="text" id="lastName" name="lastName" placeholder="Efternamn"/></p>';
            newContent += '<p><input type="email" id="addStudentEmail" name="email" placeholder="Email"/></p>';
            newContent += '<p id="feedback"></p>';
            newContent += '<p><input type="text" id="password" name="password" placeholder="Lösenord"/></p>';
            newContent += '<P><select id="listClass" name="klass"></select></p>';
            newContent += '<p><input type="submit" value="Lägg till"/></p>';
            newContent += '</form>';
            newContent += '</form></section>';

            $content.append(newContent);

            $.get('http://127.0.0.1:8000/classes/', function (data) {
                for(var i = 0; i < data.length; i++){
                    $('#listClass').append(
                        "<option value=" + data[i].listClass +">"+ data[i].listClass+"</option>"
                    );
                }
            });
        }
        else if((getSelectUserType === 'student') && (getAddDel === 'del')){

            $content.find('.box').detach();

            newContent += '<section class="box">';
            newContent += '<form id="delStudent" method="post">';
            newContent += '<p><input type="email" id="delStudentEmail" name="email" placeholder="Student (Email)"></p>';
            newContent += '<p id="feedback"></p>';
            newContent += '<p><input type="submit" value="Ta bort"></p>';
            newContent += '</form>';
            newContent += '</form></section>';

            $content.append(newContent);
        }
        else if((getSelectUserType === 'teacher') && (getAddDel === 'add')){

            $content.find('.box').detach();

            newContent  += '<section class="box">';
            newContent += '<form id="addTeacher" method="post">';
            newContent += '<p><label>Ny lärare</label></p>';
            newContent += '<p><input type="text" id="firstName" name="firstName" placeholder="Förnamn"/></p>';
            newContent += '<p><input type="text" id="lastName" name="lastName" placeholder="Efternamn"/></p>';
            newContent += '<p><input type="email" id="addTeacherEmail" name="email" placeholder="Email"/></p>';
            newContent += '<p id="feedback"></p>';
            newContent += '<p><input type="text" id="password" name="password" placeholder="Lösenord"/></p>';
            newContent += '<p><input type="submit" value="Lägg till"/> </p>';
            newContent += '</form></section>';

            $content.append(newContent);
        }
        else if((getSelectUserType === 'teacher') && (getAddDel === 'del')){

            $content.find('.box').detach();

            newContent += '<section class="box">';
            newContent += '<form id="delTeacher" method="post">';
            newContent += '<p><input type="email" id="delTeacherEmail" name="email" placeholder="Lärare (Email)"></p>';
            newContent += '<p id="feedback"></p>';
            newContent += '<p><input type="submit" value="Ta bort"></p>';
            newContent += '</form></section>';

            $content.append(newContent);
        }
        else if((getSelectUserType === 'admin') && (getAddDel === 'add')){

            $content.find('.box').detach();

            newContent += '<section class="box">';
            newContent += '<form id="addAdmin" method="post">';
            newContent += '<p><label>Ny admin</label></p>';
            newContent += '<p><input type="text" id="firstName" name="firstName" placeholder="Förnamn"/></p>';
            newContent += '<p><input type="text" id="lastName" name="lastName" placeholder="Efternamn"/></p>';
            newContent += '<p><input type="email" id="addAdminEmail" name="email" placeholder="Email"/></p>';
            newContent += '<p id="feedback"></p>';
            newContent += '<p><input type="text" id="password" name="password" placeholder="Lösenord"/></p>';
            newContent += '<p><input type="submit" value="Lägg till"/> </p>';
            newContent += '</form></section>';

            $content.append(newContent);
        }
        else if((getSelectUserType === 'admin') && (getAddDel === 'del')){

            $content.find('.box').detach();
            newContent += '<section class="box">';
            newContent += '<form id="delAdmin" method="post">';
            newContent += '<p id="feedback"></p>';
            newContent += '<p><input type="email" id="delAdminEmail" name="email" placeholder="Admin (Email)"></p>';
            newContent += '<p><input type="submit" value="Ta bort"></p>';
            newContent += '</form></section>';

            $content.append(newContent);
        }
        else if((getSelectUserType === 'klass') && (getAddDel === 'add')){

            $content.find('.box').detach();
            newContent += '<section class="box">';
            newContent += '<form id="addClass" method="post">';
            newContent += '<p><input type="text" id="listClass" name="listClass" placeholder="Klass"/></p>';
            newContent += '<p id="feedback"></p>';
            newContent += '<p><input type="submit" value="Lägg till"></p>';
            newContent += '</form></section>';

            $content.append(newContent);
        }
        else if((getSelectUserType === 'klass') && (getAddDel === 'del')){

            $content.find('.box').detach();
            newContent += '<section class="box">';
            newContent += '<form id="delClass" method="post">';
            newContent += '<select id="listClass" name="listClass">';
            newContent += '</select>';
            newContent += '<p><input type="submit" value="Ta bort"></p>';
            newContent += '</form></section>';

            $content.append(newContent);

            $.get('http://127.0.0.1:8000/classes/', function (data) {
                for(var i = 0; i < data.length; i++){
                    $('#listClass').append(
                        "<option value=" + data[i].listClass +">"+ data[i].listClass+"</option>"
                    );
                }
            });
        }

    });

    $content.on('submit','#addAdmin', function(e) {
        e.preventDefault();
        var details = $('#addAdmin').serialize();
        $.post('http://127.0.0.1:8000/addAdmin/', details, function(data) {});
        $(this)[0].reset();
    });

    $content.on('submit', '#addStudent', function(e) {
        e.preventDefault();
        var details = $('#addStudent').serialize();
        $.post('http://127.0.0.1:8000/addStudent/', details, function(data) {});
        $(this)[0].reset();
    });

    $content.on('submit', '#addTeacher', function(e) {
        e.preventDefault();
        var details = $('#addTeacher').serialize();
        $.post('http://127.0.0.1:8000/addTeacher/', details, function(data) {});
        $(this)[0].reset();
    });

    $content.on('submit', '#delAdmin', function(e) {
        e.preventDefault();
        var details = $('#delAdmin').serialize();
        $.post('http://127.0.0.1:8000/delAdmin/', details, function(data) {});
        $(this)[0].reset();
    });

    $content.on('submit', '#delStudent', function(e) {
        e.preventDefault();
        var details = $('#delStudent').serialize();
        $.post('http://127.0.0.1:8000/delStudent/', details, function(data) {});
        $(this)[0].reset();
    });

    $content.on('submit', '#delTeacher', function(e) {
        e.preventDefault();
        var details = $('#delTeacher').serialize();
        $.post('http://127.0.0.1:8000/delTeacher/', details, function(data) {});
        $(this)[0].reset();
    });

    $content.on('submit', '#delClass', function(e) {
        e.preventDefault();
        var details = $('#delClass').serialize();
        console.log(details)
        $.delete('http://127.0.0.1:8000/classes/', details, function(data) {});
        $(this)[0].reset();
    });

    $content.on('submit', '#addClass', function(e) {
        e.preventDefault();
        var details = $('#addClass').serialize();
        console.log(details);
        $.post('http://127.0.0.1:8000/newClass/', details, function(data) {});
        $(this)[0].reset();
    });
});