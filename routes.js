/**
 * Created by Grodfan on 2017-02-20.
 */
var password = require ('./models/password');
var classes = require('./models/classes');
var newTest = require('./models/newTest');
var getDataMysql = require('./models/getDataMysql');
var getTestId = require('./models/getTestId');
var newQuestion = require('./models/newQuestion');
var getQuestionId = require('./models/getQuestionId');
var newAnswers = require('./models/newAnswers');
var courseCodes = require('./models/courseCodes');
var addUser = require('./models/addUser');
var email = require('./models/email');
var teacherPassword = require('./models/validateTeacherPassword');
var studentPassword = require('./models/validateStudentPassword');
var adminPassword = require('./models/validedateAdminPassword');
var admin = require('./models/admin');
var student = require('./models/student');

// Hack
var statistics = require('./models/statistics')

module.exports = {
  configure: function (app) {

      app.post('/getGrades/', function (req,res) {
          student.getGrades(req.body.questionId, res);
      });

      app.post('/getStudentTestsDone/', function (req,res) {
          student.getStudentTestsDone(req.body.StudentId, res);
      });

      app.post('/getRightAnswers/', function (req,res) {
          student.getRightAnswers(req.body.answersId, res);
      });

      app.post('/getStudenAnswers/', function (req,res) {
          student.getStudenAnswers(req.body.StudentId, res);
      });

      app.post('/studentAnswers/', function (req,res) {
          student.studentAnswers(req.body, res);
      });

      app.post('/getStudentId/', function (req,res) {
          student.getStudentId(req.body.email, res);
      });

      app.post('/getStudentTest/', function (req,res) {
          student.getStudentTest(req.body.email, res);
      });

      app.post('/getStudentTestQuestions/', function (req,res) {
          student.getStudentTestQuestions(req.body.testId, res);
      });

      app.post('/getQuestionsAnswers/', function (req,res) {
          student.getQuestionsAnswers(req.body.questionId, res);
      });

      app.post('/getStudentIds/', function (req,res) {
          admin.getStudentIds(req.body.klass, res);
      });

      app.post('/setStudentsTest/', function (req,res) {
          admin.setStudentsTest(req.body, res);
      });

      app.post('/validateTeacherPassword/', function (req,res) {
          teacherPassword.teacherPassword(req.body.email, res);
      });

      app.post('/validateStudentPassword/', function (req,res) {
          studentPassword.studentPassword(req.body.email, res);
      });

      app.post('/validedateAdminPassword/', function (req,res) {
          adminPassword.adminPassword(req.body.email, res);
      });

      app.post('/password/', function (req,res) {
          password.checkPassword(req.body.email, res);
      });

      app.get('/classes/', function (req,res) {
          classes.getClasses(res);
      });
      
      app.delete('/classes/', function (req,res) {
          classes.delClasses(req.body.class,res);
      });

      app.post('/newTest/', function (req,res) {
          newTest.createTest(req.body, res);
      });

      app.post('/newQuestion/', function (req,res) {
          newQuestion.newQuestion(req.body, res);
      });

      app.post('/newAnswers/', function (req,res) {
          newAnswers.newAnswers(req.body, res);
      });

      app.post('/getQuestionId/', function (req,res) {
          getQuestionId.getQuestionId(req.body.questionText, res);
      });

      app.post('/getTestId/', function (req,res) {
          getTestId.getTestId(req.body.testName, res);
      });

      app.get('/courseCodes/', function (req,res) {
          courseCodes.getcourseCodes(res);
      });

      app.post('/addAdmin/', function (req,res) {
          addUser.addAdmin(req.body, res);
      });

      app.post('/addTeacher/', function (req,res) {
          addUser.addTeacher(req.body, res);
      });

      app.post('/addStudent/', function (req,res) {
          addUser.addStudent(req.body, res);
      });

      app.post('/delStudent/', function (req,res) {
          email.delStudentEmail(req.body.email, res);
      });

      app.post('/delAdmin/', function (req,res) {
          email.delAdminEmail(req.body.email, res);
      });

      app.post('/delTeacher/', function (req,res) {
          email.delTeacherEmail(req.body.email, res);
      });

      app.post('/checkStudentEmail/', function (req,res) {
          email.checkStudentEmail(req.body.email, res);
      });

      app.post('/checkTeacherEmail/', function (req,res) {
          email.checkTeacherEmail(req.body.email, res);
      });

      app.post('/checkAdminEmail/', function (req,res) {
          email.checkAdminEmail(req.body.email, res);
      });

      app.get('/', function (req,res) {
          res.sendfile(__dirname+'/public/index.html');
      });

      app.get('/student', function (req,res) {
          res.sendFile(__dirname+'/public/indexStudent.html');
      });

      app.get('/admin', function (req,res) {
          res.sendFile(__dirname+'/public/indexAdmin.html');
      });

      app.get('/teacher', function (req,res) {
          res.sendFile(__dirname+'/public/indexTeacher.html');
      });

      //----------------------------------------------------------------------------------------------------------------

      /*GET DATA METHODS*/

      app.get('/select*adminuser/', function(req, res) {
          getDataMysql.getAdminUser(res);
      });

      app.get('/select*teacher/', function(req, res) {
          getDataMysql.getTeacher(res);
      });

      app.get('/select*student/', function(req, res) {
          getDataMysql.getStudent(res);
      });

      app.get('/select*test/', function(req, res) {
          getDataMysql.getTest(res);
      });

      app.get('/select*question/', function(req, res) {
          getDataMysql.getQuestion(res);
      });

      app.get('/select*answers/', function(req, res) {
          getDataMysql.getAnswers(res);
      });

      app.get('/select*studenttests/', function(req, res) {
          getDataMysql.getStudentTests(res);
      });

      app.get('/select*studentanswers/', function(req, res) {
          getDataMysql.getStudentAnswers(res);
      });

      app.get('/StudentAnswers/', function(req, res) {
          getDataMysql.getSAnswers(res);
      });

      //----------------------------------------------------------------------------------------------------------------

      app.get('/getStatistics', function(req, res) {
          /* Här använder jag metoden som implementerar mitt SQL-uyttryck (.selectHack) */
          statistics.getNewStatistics(res, req.query.testID);
      });

  }
};

/* DEL


 var todo = require('./models/todo');
 app.post('/validateStudentEmail/', function (req,res) {
 validateStudentEmail.checkEmailStudent(req.body.email, res);
 });

 app.post('/validateAdminEmail/', function (req,res) {
 validateAdminEmail.checkEmailAdmin(req.body.email, res);
 });

 app.post('/validateTeacherEmail/', function (req,res) {
 validateTeacherEmail.checkEmailTeacher(req.body.email, res);
 });

 var validateStudentEmail = require ('./models/validateStudentEmail');
 var validateAdminEmail = require('./models/validateAdminEmail');
 var validateTeacherEmail = require('./models/validateTeacherEmail');

 app.get('/todo/', function (req,res) {
 todo.get(res);
 });

 app.post('/todo/', function (req,res) {
 todo.create(req.body, res);
 });

 */