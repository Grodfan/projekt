/**
 * Created by Henrik Berglund on 2017-03-01.
 */

var connection = require('../connection');

function getData() {

    this.getAdminUser = function(res) {
        connection.acquire(function(err, con) {
            con.query('Select * from adminuser' , function(err, result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.getTeacher = function(res) {
        connection.acquire(function(err, con) {
            con.query('Select * from teacher' , function(err, result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.getStudent = function(res) {
        connection.acquire(function(err, con) {
            con.query('Select * from student' , function(err, result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.getTest = function(res) {
        connection.acquire(function(err, con) {
            con.query('Select * from test' , function(err, result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.getQuestion = function(res) {
        connection.acquire(function(err, con) {
            con.query('Select * from question' , function(err, result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.getAnswers = function(res) {
        connection.acquire(function(err, con) {
            con.query('Select * from answers' , function(err, result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.getStudentTests = function(res) {
        connection.acquire(function(err, con) {
            con.query('Select * from studenttests' , function(err, result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.getStudentAnswers = function(res) {
        connection.acquire(function(err, con) {
            con.query('Select * from studentanswers' , function(err, result) {
                con.release();
                res.send(result);
            });
        });
    };



};

module.exports = new getData();

