/**
 * Created by Jonas on 2017-03-02.
 */
var connection = require('../connection');

function studentPassword() {
    this.studentPassword = function (email, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT password FROM Student WHERE email = ?', email, function (err, result) {
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

module.exports = new studentPassword();