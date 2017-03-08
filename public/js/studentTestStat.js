/**
 * Created by Henrik Berglund on 2017-03-06.
 */

var gQuestionPoints;
var vgQuestionPoints;
var gQuestion;
var vgQuestion;
var testNameSave = "";
var testCourseSave = "";
var testLastDateSave = "";
var testTimeSave = "";
var newContent = '';
var idForTest;

$(document).ready(function () {
    var $content = $('#content');

    $content.on('click', '.testResult', function () {
        var $selectedElement = $(this);
        var selectedTestId = $selectedElement.parent().find(".testIdValue").text();
        idForTest = parseInt(selectedTestId);

        studentTestById();
    });

        function studentTestById () {

            gQuestionPoints = 0;
            vgQuestionPoints = 0;
            gQuestion = 0;
            vgQuestion = 0;

        $.get('http://127.0.0.1:8000/select*test/', function (result) {
            for (var i in result) {
                var attribute = result[i];
                console.log(idForTest);
                if(attribute.testId === idForTest){
                    testNameSave = attribute.testName;
                    testCourseSave = attribute.courseName;
                    testLastDateSave = attribute.lastDate;
                    testTimeSave = attribute.timeForTestMINUTES;
                }
            }
        });

        $.get('http://127.0.0.1:8000/select*question/', function (result) {
            for (var i in result) {
                var attributeQuestion = result[i];

                if(idForTest == attributeQuestion.testId) {
                    if(attributeQuestion.gradeG == "true"){
                        gQuestion++;
                        console.log('HEJSAN DU')
                    }
                    else{
                        vgQuestion++;
                        console.log('HEJSAN DasdasdU')
                    }
                }
            }
        });

        $.get('http://127.0.0.1:8000/StudentAnswers/', function (result) {

            $.get('http://127.0.0.1:8000/select*answers/', function (result2) {
                $.get('http://127.0.0.1:8000/select*question/', function (result3) {

                    for (var i in result) {
                        var attributeStudentAnswers = result[i];
                        if(attributeStudentAnswers.TestId == idForTest){

                        for (var i in result2) {
                            var attributeAnswers = result2[i];

                            if(attributeStudentAnswers.AnswersId === attributeAnswers.answersId){

                                if(attributeAnswers.answerStatus == "true"){
                                    console.log(attributeAnswers.answerStatus);

                                    for (var i in result3) {
                                        var attributeQuestion2 = result3[i];

                                        if(attributeStudentAnswers.QuestionId == attributeQuestion2.questionId){

                                            if(attributeQuestion2.gradeG === "true"){
                                                gQuestionPoints++;

                                            }
                                            else if(attributeQuestion2.gradeVg){
                                                vgQuestionPoints++;

                                            }

                                        }
                                    }
                                }
                            }
                        }
                }
            }

                    $content.empty();

                    var newContent = '';
                    console.log(vgQuestionPoints);
                    console.log(gQuestionPoints);
                    newContent += '<section class="box">';
                    newContent += '<p>Prov: '+testNameSave +'</p>';
                    newContent += '<p>Kurs: '+testCourseSave+'</p>';
                    newContent += '<p>Tid i minuter: '+testTimeSave+'</p>';
                    newContent += '<p>Godkänt frågor: '+gQuestionPoints+' / '+gQuestion+'</p>';
                    newContent += '<p>Väl godkänt frågor: '+ vgQuestionPoints +' / '+vgQuestion+'</p>';
                    newContent += '</section>';

                    $content.append(newContent);

        });
        });

        });
    }
});