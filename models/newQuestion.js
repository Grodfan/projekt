/**
 * Created by Jonas on 2017-02-28.
 */
var connection = require('../connection');

function newQuestion() {
    this.newQuestion = function (newQuestion, res) {
        connection.acquire(function (err, con) {
            con.query('INSERT INTO question SET ?', newQuestion, function (err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    res.send({status: 1, message: 'fel q insert'});
                } else {
                    res.send();
                }
            });
        });
    }
}

module.exports = new newQuestion();