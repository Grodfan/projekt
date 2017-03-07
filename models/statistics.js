/**
 * Created by jennifergisslow on 2017-03-05.
 */

var connection = require('../connection');

/* SQL entries here */
function getTestName(testID, callback) {
    connection.acquire(function(err, con) {
        con.query('Select testName from test where testId = ?', testID, function(err, result) {
            con.release();
            callback(result[0].testName);
        });
    });
};

function getTestTime(testID, callback) {
    connection.acquire(function(err, con) {
        con.query('Select timeForTestMINUTES from test where testId = ?', testID, function(err, result) {
            con.release();
            callback(result[0].timeForTestMINUTES);
        });
    });
};

function selfCorrectingInformation(testID, callback) {
    connection.acquire(function(err, con) {
        con.query('select selfCorrect from test where testId = ?', testID, function(err, result) {
            con.release();
            for(var i in result){
                var newResult;
                if (result[i].selfCorrect === 'true'){
                    newResult = 'Ja';
                }
                else{
                    newResult = 'Nej';
                }
                callback(newResult);
            }

        });
    });
};

function seeTestInformation(testID, callback) {
    connection.acquire(function(err, con) {
        con.query('select seeTestAfter from test where testId = ?', testID, function(err, result) {
            con.release();
            for(var i in result){
                var newResult;
                if (result[i].seeTestAfter === 'true'){
                    newResult = 'Ja';
                }
                else{
                    newResult = 'Nej';
                }
                callback(newResult);
            }
        });
    });
};

function getNumberOfMaxDone(testID, callback) {
    connection.acquire(function(err, con) {
        con.query('select studenttestsid from studenttests where testid = ?', testID, function(err, result) {
            con.release();
            /* T.ex. använd loopar och räkna på grejer här.. */
            callback(result.length);
        });
    });
};

function maxAmountOfQuestions(testID, callback) {
    connection.acquire(function(err, con) {
        con.query('Select questionId from question where testId = ?',testID, function(err, result){
            con.release();
            callback(result.length);
        });
    });
};

function getNumberOfDone(testID, callback) {
    connection.acquire(function(err, con) {
        con.query('Select StudentAnswersId from studentanswers where testId = ?',testID, function(err, result){
            con.release();
            var newResult = 0;
            if (result.length > 0){
                newResult = result.length/result.length;
            }
            callback(newResult);
        });
    });
};

function getGradeGQuestions(testID, callback) {
    connection.acquire(function(err, con) {
        con.query('select questionId from question where gradeG = "true" and testId = ?',testID, function(err, result){
            con.release();
                callback(result.length);
        });
    });
};

function getGradeVGQuestions(testID, callback) {
    connection.acquire(function(err, con) {
        con.query('select questionId from question where gradeVg = "true" and testId = ?',testID, function(err, result){
            con.release();
            callback(result.length);
        });
    });
};

function getTestDate(testID, callback) {
    connection.acquire(function(err, con) {
        con.query('Select lastDate from test where testId = ?',testID, function(err, result){
            con.release();
            callback(result[0].lastDate);
        });
    });
};


function Statistics() {

    this.getNewStatistics = function(res, testID){
        getTestName(testID, function (testName) {
            getNumberOfDone(testID, function (numberOfDone) {
                getNumberOfMaxDone(testID, function (numberOfMaxDone) {
                    getTestTime(testID, function(testTime){
                        getGradeGQuestions(testID, function (gQuestions) {
                            getGradeVGQuestions(testID, function (vgQuestions) {
                                getTestDate(testID,function (testDate) {
                                    maxAmountOfQuestions(testID, function (maxAmountQuestions) {
                                        selfCorrectingInformation(testID, function (selfCorrecting) {
                                            seeTestInformation(testID, function (seeTestAfter) {
                                                var obj={
                                                    testName: testName,
                                                    numDone: numberOfDone,
                                                    maxDone: numberOfMaxDone,
                                                    testTime: testTime,
                                                    amountGQuestions: gQuestions,
                                                    amountVGQuestions: vgQuestions,
                                                    lastTestDate: testDate,
                                                    maxQuestions: maxAmountQuestions,
                                                    selfCorrectingTest: selfCorrecting,
                                                    abelToSeeTestResultAfter: seeTestAfter
                                                };
                                                res.send(obj);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    };

}

module.exports = new Statistics();