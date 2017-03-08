/**
 * Created by Jonas on 2017-02-23.
 * Kontrollerar email vid login.
 */
$("#email").blur(function(e) {
    e.preventDefault();

    var $feedbackEmail = $('#feedbackEmail');
    var $email = $("#email");
    var email = $email.serialize();
    var inputEmail = $email.val();
    var inputUserType = $('#selectUserType option:selected').val();

    if(inputUserType === 'student'){
        $.post('http://127.0.0.1:8000/checkStudentEmail/',email,function (data) {
            var status = data[0];
            console.log(data[0]);
            if(status !== undefined){
                $feedbackEmail.hide();
            }
            else if(status === undefined){
                $feedbackEmail.show();
                $feedbackEmail.text('Student: ' + inputEmail + ' Finns ej!');
                $email.val('');
            }
        });
    }
    else if(inputUserType === 'teacher'){

        $.post('http://127.0.0.1:8000/checkTeacherEmail/',email,function (data) {
            var status = data[0];
            console.log(data[0]);
            if(status !== undefined){
                $feedbackEmail.hide();
            }
            else if(status === undefined){
                $feedbackEmail.show();
                $feedbackEmail.text('Lärare: ' + inputEmail + ' Finns ej!');
                $email.val('');
            }
        });
    }
    else if(inputUserType === 'admin'){
        $.post('http://127.0.0.1:8000/checkAdminEmail/',email,function (data) {
            var status = data[0];
            console.log(data[0]);
            if(status !== undefined){
                $feedbackEmail.hide();
            }
             else if(status === undefined){
             $feedbackEmail.show();
             $feedbackEmail.text('Admin: ' + inputEmail + ' Finns ej!');
             $email.val('');
            }
        });
    }
});