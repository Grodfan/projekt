/**
 * Created by Grodfan on 2017-02-20.
 */
var todo = require('./models/todo');
var password = require ('./models/password');
var classes = require('./models/classes');
var validateStudentEmail = require ('./models/validateStudentEmail');
var validateAdminEmail = require('./models/validateAdminEmail');
var validateTeacherEmail = require('./models/validateTeacherEmail');
var newTest = require('./models/newTest');

var getDataMysql = require('./models/getDataMysql');

module.exports = {
  configure: function (app) {
      app.get('/todo/', function (req,res) {
          todo.get(res);
      });

      app.post('/todo/', function (req,res) {
          todo.create(req.body, res);
      });

      app.post('/validateStudentEmail/', function (req,res) {
          validateStudentEmail.checkEmailStudent(req.body.email, res);
      });

      app.post('/validateAdminEmail/', function (req,res) {
          validateAdminEmail.checkEmailAdmin(req.body.email, res);
      });

      app.post('/validateTeacherEmail/', function (req,res) {
          validateTeacherEmail.checkEmailTeacher(req.body.email, res);
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

      app.get('/add', function (req,res) {
          res.sendFile(__dirname+'/public/add.html');
      });

      app.get('/', function (req,res) {
          res.sendFile(__dirname+'/public/Login.html');
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

      app.get('/select*answers/', function(req, res) {'' +
          getDataMysql.getAnswers(res);
      });

      app.get('/select*studenttests/', function(req, res) {
          getDataMysql.getStudentTests(res);
      });

      app.get('/select*studentanswers/', function(req, res) {
          getDataMysql.getStudentAnswers(res);
      });

      //----------------------------------------------------------------------------------------------------------------

  }
};