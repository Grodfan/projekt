/**
 * Created by Jonas on 2017-02-27.
 */
var connection = require('../connection');

function getTestId() {

    this.getTestId = function (getTestId, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT testId FROM test WHERE testName = ?', getTestId, function (err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    res.send({status: 1, message: 'fel test id'});
                } else {
                    res.send(result);
                }
            });
        });
    }
}

module.exports = new getTestId();