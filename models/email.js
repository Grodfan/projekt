/**
 * Created by Jonas on 2017-02-22.
 */
var connection = require('../connection');

function email() {
    this.checkStudentEmail = function (email, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT email FROM Student WHERE email = ?', email, function (err, result) {
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

    this.checkAdminEmail = function (email, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT email FROM AdminUser WHERE email = ?', email, function (err, result) {
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

    this.checkTeacherEmail = function (email, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT email FROM teacher WHERE email = ?', email, function (err, result) {
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

    this.delStudentEmail = function (email, res) {
        connection.acquire(function (err, con) {
            con.query('DELETE Student.*,StudentAnswers.*, StudentTests.* FROM Student ' +
                'INNER JOIN StudentTests ' +
                'ON Student.StudentId = StudentTests.StudentId ' +
                'INNER JOIN StudentAnswers ' +
                'ON StudentTests.StudentId = StudentAnswers.StudentId ' +
                'WHERE Student.email = ?', [email], function (err, result) {
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

    this.delAdminEmail = function (email, res) {
        connection.acquire(function (err, con) {
            con.query('DELETE FROM AdminUser WHERE email = ?', [email], function (err, result) {
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

    this.delTeacherEmail = function (email, res) {
        connection.acquire(function (err, con) {
            con.query('DELETE FROM Teacher WHERE email = ?', [email], function (err, result) {
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

module.exports = new email();