/**
 * Created by Grodfan on 2017-02-20.
 */
var todo = require('./models/todo');
var email = require ('./models/email');
var password = require ('./models/password');
var classes = require('./models/classes');

module.exports = {
  configure: function (app) {
      app.get('/todo/', function (req,res) {
          todo.get(res);
      });

      app.post('/todo/', function (req,res) {
          todo.create(req.body, res);
      });

      app.post('/email/', function (req,res) {
          email.checkEmail(req.body.email, res);
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

      app.get('/add', function (req,res) {
          res.sendfile(__dirname+'/public/add.html');
      });

      app.get('/', function (req,res) {
          res.sendfile(__dirname+'/public/Login.html');
      });
  }
};