/**
 * Created by Jonas on 2017-03-04.
 */
var connection = require('../connection');

function admin() {
    this.setStudentsTest = function (students, res) {
        connection.acquire(function (err, con) {
            con.query('INSERT INTO StudentTests SET ?', students, function (err, result) {
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

    this.getStudentIds = function (klass, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT studentId FROM Student WHERE klass = ?', klass, function (err, result) {
                con.release();
                res.send(result);
            });
        });
    };
}

module.exports = new admin();