/**
 * Created by Jonas Johansson, Java2, on 2017-02-24.
 * Lists all classes.
 */
$('#newButtons').on('click', '#addStudent',function () {
    $.get('http://127.0.0.1:8000/classes/', function (data) {
        for(var i = 0; i < data.length; i++){
            $('#listClass').append(
                "<option value=" + data[i].class +">"+ data[i].class+"</option>"
            );
        }
    });
});