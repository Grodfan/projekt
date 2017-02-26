/**
 * Created by Jonas on 2017-02-23.
 */
$("#email").blur(function(e) {
    e.preventDefault();

    var $feedbackEmail = $('#feedbackEmail');
    var $email = $("#email");
    var email = $email.serialize();
    var inputEmail = $email.val();
    var inputUserType = $('#selectUserType option:selected').val();

    if(inputUserType === 'student'){
        $.post('http://127.0.0.1:8000/email/',email,function (data) {
            var status = data[0];
            console.log(data[0]);
            if(status !== undefined){
                $feedbackEmail.hide();
            }
            else if(status === undefined){
                $feedbackEmail.show();
                $feedbackEmail.text('Användare: ' + inputEmail + ' Finns ej!');
                $email.val('');
            }
        });
    }
    else if(inputUserType === 'teacher'){
        console.log('nope teacher');
    }
    else if(inputUserType === 'admin'){
        console.log('nope admin')
    }

});