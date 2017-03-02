/**
 * Created by Jonas on 2017-02-28.
 */
var connection = require('../connection');

function getQuestionId() {

    this.getQuestionId = function (getQuestionId, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT questionId FROM Question WHERE questionText = ?', getQuestionId, function (err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    res.send({status: 1, message: 'fel test questtext'});
                } else {
                    res.send(result);
                }
            });
        });
    }
}

module.exports = new getQuestionId();