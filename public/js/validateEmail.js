/**
 * Created by Jonas on 2017-02-22.
 */
$(document).ready(function () {
    var $content = $('#content');


    $content.on('blur','#addStudentEmail', function (e) {

        e.preventDefault();
        var $feedback = $('#feedback');
        var $email = $("#addStudentEmail");
        var email = $email.serialize();
        var inputEmail = $email.val();

        $.post('http://127.0.0.1:8000/checkStudentEmail/',email,function (data) {
            var status = data[0];
            console.log(data[0]);
            if(status !== undefined){
                $feedback.show();
                $feedback.text(inputEmail + ' finns redan!');
                $email.val('');
            }
            else if(status === undefined){
                $feedback.hide();
            }
        });
    });

    $content.on('blur','#addTeacherEmail', function (e) {

        e.preventDefault();

        var $feedback = $('#feedback');
        var $email = $("#addTeacherEmail");
        var email = $email.serialize();
        var inputEmail = $email.val();

            $.post('http://127.0.0.1:8000/checkTeacherEmail/',email,function (data) {
                var status = data[0];

                console.log(data[0]);
                if(status !== undefined){
                    $feedback.show();
                    $feedback.text(inputEmail + ' finns redan!');
                    $email.val('');
                }
                else if(status === undefined){
                    $feedback.hide();
                }
            });
    });

    $content.on('blur','#addAdminEmail', function (e) {

        e.preventDefault();

        var $feedback = $('#feedback');
        var $email = $("#addAdminEmail");
        var email = $email.serialize();
        var inputEmail = $email.val();

        $.post('http://127.0.0.1:8000/checkAdminEmail/',email,function (data) {
            var status = data[0];

            console.log(data[0]);
            if(status !== undefined){
                $feedback.show();
                $feedback.text(inputEmail + ' finns redan!');
                $email.val('');
            }
            else if(status === undefined){
                $feedback.hide();
            }
        });
    });

});