/**
 * Created by Jonas on 2017-02-22.
 * Slumpar fram ett random lösenord.
 */
$('#content').on('focus','#password',function() {
    var $password = $('#password');

    $password.focus(function () {
        var newPassword = '';
        var randomPasswordArray = ['a', 'b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u',
                                  'v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P',
                                  'Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0'];

            for(var i = 0; i < 10; i++){
                newPassword += randomPasswordArray[Math.floor(Math.random()*randomPasswordArray.length)];
            }

        $password.val(newPassword);
    });
});