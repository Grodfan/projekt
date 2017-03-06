/**
 * Created by Jonas on 2017-03-04.
 */
var connection = require('../connection');

function student() {

    this.getStudentTest = function (email, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT T.*' +
                ' FROM Test AS T' +
                ' INNER JOIN StudentTests AS ST' +
                ' ON T.TestId = ST.testId' +
                ' INNER JOIN Student AS S' +
                ' ON ST.StudentId = S.studentId' +
                ' WHERE S.email = ?', email, function (err, result) {
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

    this.getStudentTestQuestions = function (testId, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM question WHERE testid = ?', testId, function (err, result) {
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

    this.getQuestionsAnswers = function (questionId, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT answerStatus, answerText FROM answers WHERE questionid = ?', questionId, function (err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    res.send({status: 1, message: 'fel question id'});
                } else {
                    res.send(result);
                }
            });
        });
    }
}

module.exports = new student();


