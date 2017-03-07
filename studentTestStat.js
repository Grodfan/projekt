/**
 * Created by Henrik Berglund on 2017-03-06.
 */


var gQuestionPoints = 0;
var vgQuestionPoints = 0;

var gQuestion = 0;
var vgQuestion = 0;
var testNameSave = "";
var testCourseSave = "";
var testLastDateSave = "";
var testTimeSave = "";

var newContent = '';

var idForTest = 1;




$(document).ready(function () {

    function studentTestById () {




        $.get('http://127.0.0.1:8000/select*test/', function (result) {
            for (var i in result) {
                var attribute = result[i];
                if(attribute.TestId === idForTest){

                    testNameSave = attribute.testName;
                    testCourseSave = attribute.courseName;
                    testLastDateSave = attribute.lastDate;
                    testTimeSave = attribute.timeForTestMINUTES;
                    console.log("funkar");



                }
            }

        });


        $.get('http://127.0.0.1:8000/select*question/', function (result) {
            var Gcounter = 0;
            var VGcounter = 0;
            for (var i in result) {
                var attributeQuestion = result[i];

                if(idForTest == attributeQuestion.TestId == 1) {
                    if(attributeQuestion.gradeG == "true"){
                        gQuestion++;
                    }
                    else{
                        vgQuestion++;
                    }
                }

            }

        });




        $.get('http://127.0.0.1:8000/StudentAnswers/', function (result) {
            $.get('http://127.0.0.1:8000/select*answers/', function (result2) {
                $.get('http://127.0.0.1:8000/select*question/', function (result3) {

            for (var i in result) {
                var attributeStudentAnswers = result[i];

                if(attributeStudentAnswers.testid == idForTest){
                    console.log(attributeStudentAnswers.AnswersId);



                        for (var i in result2) {
                            var attributeAnswers = result2[i];

                            if(attributeStudentAnswers.AnswersId === attributeAnswers.answersId){

                                if(attributeAnswers.answerStatus == "true"){
                                    console.log(attributeAnswers.answerStatus);

                                    for (var i in result3) {
                                        var attributeQuestion2 = result3[i];

                                        if(attributeStudentAnswers.QuestionId == attributeQuestion2.questionid){

                                            if(attributeQuestion2.gradeG === "true"){
                                                gQuestionPoints++;
                                                console.log("ok 5");
                                            }
                                            else if(attributeQuestion2.gradeVg){
                                                vgQuestionPoints++;

                                                console.log("ok 6");
                                            }
                                        }
                                    }


                                }











                            }
                        }
                }
            }
        });
        });
        });












        /*
        $.get('http://127.0.0.1:8000/StudentAnswers/', function (result1) {
            $.get('http://127.0.0.1:8000/select*answers/', function (result2) {
            $.get('http://127.0.0.1:8000/select*question/', function (resultd) {
            console.log("ok 1");
            for (var i in result1) {
                var attributeStudentAnwers = result1[i];
                console.log("ok 2");
                if(idForTest === attributeStudentAnwers.testiddb){
                    console.log(attributeStudentAnwers.testiddb);


                        console.log("ok 4");
                        for (var i in result2) {
                            var attributeAnswers = result2[i];

                            if(attributeStudentAnwers.AnswersId == attributeAnswers.answersId) {

                                if (attributeAnswers.answerStatusDB === "true") {


                                        for (var i in resultd) {
                                            var attributeQuestion2 = resultd[i];

                                            if(attributeStudentAnwers.QuestionId == attributeQuestion2.questioniddb){

                                                if(attributeQuestion2.gradeGDB === "true"){
                                                    gQuestionPoints++;
                                                    console.log("ok 5");
                                                }
                                                else if(attributeQuestion2.gradeVgDB){
                                                    vgQuestionPoints++;

                                                    console.log("ok 6");
                                                }
                                            }
                                        }


                                }
                            }
                        }

                }
            }



            });
            });
        });
        */



    }
    $('#btn').click(function () {
        printResult();
    });

    var $content = $('#content');

    function printResult() {

        var newContent = '';

        newContent += '<h1>Prov: '+testNameSave +'<h1/>';
        newContent += '<h1>Kurs: '+testCourseSave+'<h1/>';
        newContent += '<h1>Tid i minuter: '+testTimeSave+'<h1/>';
        newContent += '<h1>Godkänt frågor: '+gQuestionPoints+' / '+gQuestion+'<h1/>';
        newContent += '<h1>Väl godkänt frågor: '+vgQuestionPoints+' / '+vgQuestion+'<h1/>';

        $content.append(newContent);

        console.log(testNameSave + ' ' + testCourseSave + ' ' + testTimeSave);
        console.log(gQuestionPoints);
        console.log(vgQuestionPoints);
        console.log(gQuestion);
        console.log(vgQuestion);
        console.log("Godkänt frågor: " + gQuestionPoints + " / " + gQuestion);
        console.log("Väl godkänt frågor: " + vgQuestionPoints + " / " + vgQuestion);
    }

    studentTestById();

});




/* DETTA SKA IN I MODELS getDataMysql.js

 this.getSAnswers = function (res) {
 connection.acquire(function(err, con) {
 con.query('SELECT * FROM StudentAnswers' , function(err, result) {
 con.release();
 res.send(result);
 });
 });
 }




DETTA SKA IN I ROUTES LÄNST NER


 app.get('/StudentAnswers/', function(req, res) {
 getDataMysql.getSAnswers(res);
 });

 */

