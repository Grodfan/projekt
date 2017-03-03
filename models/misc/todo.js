/**
 * Created by Grodfan on 2017-02-20.
 */
var connection = require('../connection');

function todo() {
    this.get = function (res) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM testTable', function (err, result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.create = function (todo, res) {
        connection.acquire(function (err, con) {
            con.query('INSERT INTO testTable SET ?', todo, function (err, result) {
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

module.exports = new todo();