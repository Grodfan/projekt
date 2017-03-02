/**
 * Created by Jonas on 2017-03-01.
 */
var connection = require('../connection');

function newAnswers() {
    this.newAnswers = function (newAnswers, res) {
        connection.acquire(function (err, con) {
            con.query('INSERT INTO Answers SET ?', newAnswers, function (err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    res.send({status: 1, message: 'fel answer insert'});
                } else {
                    res.send();
                }
            });
        });
    }
}

module.exports = new newAnswers();