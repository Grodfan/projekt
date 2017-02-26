/**
 * Created by Jonas on 2017-02-22.
 */
$('#nameForm').on('submit', function(e) {
    e.preventDefault();
    var details = $('#nameForm').serialize();
    $.post('http://127.0.0.1:8000/todo/', details, function(data) {
        $('#content').html('Användare tillagd');
    });
});
