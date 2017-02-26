/**
 * Created by Jonas on 2017-02-23.
 */
$("#loginForm").on('submit',function(e) {
    e.preventDefault();

    var $feedbackPassword = $('#feedbackPassword');
    var $email = $('#email');
    var email = $email.serialize();
    var $password = $("#password");
    var inputPassword = $password.val();
    var inputUserType = $('#selectUserType option:selected').val();

    if(inputUserType === 'student') {
        $.post('http://127.0.0.1:8000/password/', email, function (data) {
            var status = data[0].password;
            console.log(data[0].password);
            if (status === inputPassword) {
                $email.val('');
                $password.val('');
                //$.get('http://127.0.01.1:8000/add');
                window.location.href = '/add';
            }
            else if (status !== inputPassword) {
                $feedbackPassword.show();
                $feedbackPassword.text('Fel lösenord!');
                $password.val('');
            }
        });
    }
    else if(inputUserType === 'teacher'){
        console.log('Fel lösenord teacher');
    }
    else if(inputUserType === 'admin'){
        console.log('Fel lösenord admin')
    }
});