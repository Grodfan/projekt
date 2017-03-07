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
            con.query('SELECT answersId, answerStatus, answerText FROM answers WHERE questionid = ?', questionId, function (err, result) {
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

    this.studentAnswers = function (studentAnswers, res) {
        connection.acquire(function (err, con) {
            con.query('INSERT INTO StudentAnswers SET ?', studentAnswers, function (err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    res.send({status: 1, message: 'creation failed'});
                } else {
                    console.log('created successfully');
                    res.send({status: 0, message: 'created successfully'});
                }
            });
        });
    }

    this.getStudentId = function (email, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT studentId FROM Student WHERE email = ?', email, function (err, result) {
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

    this.getStudenAnswers = function (email, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT TestId,QuestionId,AnswersId FROM StudentAnswers WHERE StudentId = ?', email, function (err, result) {
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

    this.getRightAnswers = function (id, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT answerStatus,questionId FROM Answers WHERE answersId = ?', id, function (err, result) {
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

    this.getStudentTestsDone = function (id, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT TestId FROM StudentAnswers WHERE StudentId = ?', id, function (err, result) {
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

    this.getGrades = function (id, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT gradeG, gradeVg FROM Question WHERE questionId = ?', id, function (err, result) {
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

module.exports = new student();


