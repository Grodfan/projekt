/**
 * Created by Jonas on 2017-03-07.
 */
$(document).ready(function () {
    var $content = $('#content');

    $('#register').on('click', function () {
        var newContent = '';
        $content.empty();

        $.get('http://127.0.0.1:8000/select*student/', function (result) {
            newContent += '<section class="box">';
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
                newContent += '<td>' + result[i].firstName + '</td>';
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

    });
});