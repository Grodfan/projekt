/*
* Leon och Henrik.
* Register på adminsidan som visar lärare/elev/admin.
*
* */

$(document).ready(function () {
    var $content = $('#content');

    $('#register').on ('click', function () {
        var newContent = '';
        $content.empty();

        newContent  += '<section class="boxQ">';
        newContent += '<select id="selectUserTypeRegister" name="newUser">';
        newContent += '<option value="empty"></option>';
        newContent += '<option value="student">Student</option>';
        newContent += '<option value="teacher">Lärare</option>';
        newContent += '<option value="admin">Admin</option>';
        newContent += '</select></section>';

        $content.append(newContent);
    });

    $content.on('click', '#selectUserTypeRegister', function () {
        var newContent = '';
        var getSelectUserType = $('#selectUserTypeRegister option:selected').val();

        if(getSelectUserType === 'student') {
            $content.find('.box').detach();

            $.get('http://127.0.0.1:8000/select*student/', function (result) {
                newContent  += '<section class="box">';
                newContent += '<table id="studentCss">';
                newContent += '<thead id="studentTableHead">';
                newContent += '<tr>';
                newContent += '<th>Namn</th>';
                newContent += '<th>Efternamn</th>';
                newContent += '<th>Email</th>';
                newContent += '<th>Klass</th>';
                newContent += '</tr></thead>';
                newContent += '<tbody id="studentTable">';

                for (var i in result) {
                    newContent += '<tr>';
                    newContent += '<td>' + result[i].firstName +'</td>';
                    newContent += '<td>' + result[i].lastName + '</td>';
                    newContent += '<td>' + result[i].email + '</td>';
                    newContent += '<td>' + result[i].klass + '</td>';
                    newContent += '</tr>';
                }

                newContent += '</tbody>';
                newContent += '</table>';
                newContent += '</section>';

                $content.append(newContent);
            });
        }
        else if(getSelectUserType === 'admin'){
            $content.find('.box').detach();

            $.get('http://127.0.0.1:8000/select*adminuser/', function (result) {
                newContent  += '<section class="box">';
                newContent += '<table id="adminCss">';
                newContent += '<thead id="adminTableHead">';
                newContent += '<tr>';
                newContent += '<th>Namn</th>';
                newContent += '<th>Efternamn</th>';
                newContent += '<th>Email</th>';
                newContent += '</tr></thead>';
                newContent += '<tbody id="adminTable">';

                    for (var i in result) {
                        newContent += '<tr>';
                        newContent += '<td>' + result[i].firstName + '</td>';
                        newContent += '<td>' + result[i].lastName + '</td>';
                        newContent += '<td>' + result[i].email +'</td>';
                        newContent += '</tr>';
                    }

                newContent += '</tbody>';
                newContent += '</table>';
                newContent += '</section>';

                $content.append(newContent);
            });
        }
        else if(getSelectUserType === 'teacher'){
            $content.find('.box').detach();

            $.get('http://127.0.0.1:8000/select*teacher/', function (result) {

                newContent  += '<section class="box">';
                newContent += '<table id="teacherCss">';
                newContent += '<thead id="teacherTableHead">';
                newContent += '<tr>';
                newContent += '<th>Namn</th>';
                newContent += '<th>Efternamn</th>';
                newContent += '<th>Email</th>';
                newContent += '</tr></thead>';
                newContent += '<tbody id="teacherTable">';

                    for (var i in result) {
                        newContent += '<tr>';
                        newContent += '<td>' + result[i].firstName + '</td>';
                        newContent += '<td>' + result[i].lastName + '</td>';
                        newContent += '<td>' + result[i].email +'</td>';
                        newContent += '</tr>';
                    }

                newContent += '</tbody>';
                newContent += '</table>';
                newContent += '</section>';

            $content.append(newContent);
            });
        }
    });


    /*$('#resultAndStatistic').on('click', function () {
        $content.empty();
        var newContent = '';



        $.get('http://127.0.0.1:8000/select*student/', function (result) {

            newContent += '<table id="studentCss">';
            newContent += '<thead id="studentTableHead">';
            newContent += '<tr>';
            newContent += '<th>Namn</th>';
            newContent += '<th>Email</th>';
            newContent += '<th>Klass</th>';
            newContent += '</tr></thead>';
            newContent += '<tbody id="studentTable">';

                for (var i in result) {
                    newContent += '<tr>';
                    newContent += '<td>'+ result[i].firstName + " " + result[i].lastName +'</td>';
                    newContent += '<td>'+ result[i].email+'</td>';
                    newContent += '<td>'+ result[i].klass +'</td>';
                    newContent += '</tr>';
                }

            newContent += '</tbody>';
            newContent += '</table>';

            $content.append(newContent);
        });
    });



    function getTeacher () {

        var $content = $('#content');

        var newContent = '';

        $.get('http://127.0.0.1:8000/select*teacher/', function (result) {

            for (var i in result) {
                var attribute = result[i];

                var teacherContent = attribute.FirstName +  " " + attribute.LastName + " Mail: " + attribute.Email;

                newContent += '<li>'+teacherContent+'</li>';
            }

            $content.html(newContent);
        });

    };


    function getAdmin () {

        var $content = $('#content');

        var newContent = '';

        $.get('http://127.0.0.1:8000/select*adminuser/', function (result) {

            for (var i in result) {
                var attribute = result[i];

                var adminContent = attribute.FirstName +  " " + attribute.LastName + " Mail: " + attribute.Email;

                newContent += '<li>'+adminContent+'</li>';
            }

            $content.html(newContent);
        });

    };

*/

});
