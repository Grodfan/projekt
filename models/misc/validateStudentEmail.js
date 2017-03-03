/**
 * Created by Jonas on 2017-02-22.
 */
var connection = require('../connection');

function email() {
    this.checkEmailStudent = function (email, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT email FROM student WHERE email = ?', email, function (err, result) {
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

module.exports = new email();