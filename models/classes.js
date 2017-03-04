/**
 * Created by Jonas on 2017-02-24.
 */
var connection = require('../connection');

function classes() {
    this.getClasses = function (res) {
        connection.acquire(function (err, con) {
            con.query('SELECT listClass FROM listClasses', function (err, result) {
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

module.exports = new classes();