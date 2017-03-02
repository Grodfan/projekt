/**
 * Created by Henrik Berglund on 2017-03-02.
 */




$(document).ready(function () {

    //Detta är ett Id på ett test som du vill hämta
    var TestToGet = 2;


    $('#testButton').click(function () {


        $.get('http://127.0.0.1:8000/select*test/', function (result) {
            for (var i in result) {
                var attributeTest = result[i];

                //Om id på det test som du vill hämta matchar så hämtar du frågor och svar!
                if (attributeTest.testId == TestToGet) {

                    console.log(attributeTest.testId);


                    //HÄMTA ALLA FRÅGOR TILL testet
                    $.get('http://127.0.0.1:8000/select*question/', function (result) {
                        for (var i in result) {
                            var attributeQuestion = result[i];

                            //OM FRÅGAN ÄR HAR ID SOM ÄR TILL DETTA TESTTET
                            if (attributeQuestion.testId == TestToGet) {


                                console.log(attributeQuestion.testId);


                                $.get('http://127.0.0.1:8000/select*question/', function (result) {
                                    for (var i in result) {
                                        var attributeAnswer = result[i];

                                        if (attributeQuestion.QuestionId == attributeAnswer.QuestionId) {

                                            console.log(attributeQuestion.QuestionId);

                                            console.log(attributeAnswer.QuestionId);
                                            //HÄMTA UT SSVAR TILL FRÅGA
                                        }

                                    }

                                });


                            }


                        }

                    });


                }


            }

        });


    });





});