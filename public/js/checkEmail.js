/**
 * Created by Jonas on 2017-02-22.
 */
$("#email").blur(function(e) {
    e.preventDefault();

    var feedback = $('#feedback');
    var $email = $("#email");
    var email = $email.serialize();
    var inputEmail = $email.val();

    $.post('http://127.0.0.1:8000/email/',email,function (data) {
        var status = data[0];
        console.log(data[0]);
            if(status !== undefined){
                feedback.show();
                feedback.text(inputEmail + ' finns redan!');
                $email.val('');
            }
            else if(status === undefined){
                feedback.hide();
            }
    });
});