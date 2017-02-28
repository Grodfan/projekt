/**
 * Created by Jonas on 2017-02-27.
 */
var connection = require('../connection');

function newTest() {
    this.createTest = function (newTest, res) {
        connection.acquire(function (err, con) {
            con.query('INSERT INTO test SET ?', newTest, function (err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    res.send({status: 1, message: 'fel'});
                } else {
                    res.send('Success');
                }
            });
        });
    }
}

module.exports = new newTest();