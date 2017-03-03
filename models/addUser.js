/**
 * Created by Jonas on 2017-03-02.
 */
var connection = require('../connection');

function User() {

this.addAdmin = function (admin, res) {
    connection.acquire(function (err, con) {
        con.query('INSERT INTO adminUser SET ?', admin, function (err, result) {
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

};

    this.addStudent = function (student, res) {
        connection.acquire(function (err, con) {
            con.query('INSERT INTO student SET ?', student, function (err, result) {
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
    };

    this.addTeacher = function (teacher, res) {
        connection.acquire(function (err, con) {
            con.query('INSERT INTO teacher SET ?', teacher, function (err, result) {
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

    };

}

module.exports = new User();