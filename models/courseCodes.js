/**
 * Created by Jonas on 2017-03-02.
 */
var connection = require('../connection');

function courseCodes() {
    this.getcourseCodes = function (res) {
        connection.acquire(function (err, con) {
            con.query('SELECT courseCode FROM CourseCodes', function (err, result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.delClasses = function (classes, res) {
        connection.acquire(function (err, con) {
            con.query('DELETE FROM classTable WHERE class = ?', [classes], function (err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    res.send({status: 1, message: 'Failed to delete'});
                } else {
                    console.log('Deleted successfully');
                    res.send({status: 0, message: 'Deleted successfully'});
                }
            });
        });
    };
}

module.exports = new courseCodes();