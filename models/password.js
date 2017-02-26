var connection = require('../connection');

function password() {
    this.checkPassword = function (password, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT password FROM testTable WHERE email = ?', password, function (err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    res.send({status: 1, message: 'fel'});
                } else {
                    res.send(result);
                }
            });
        });
    }
}

module.exports = new password();