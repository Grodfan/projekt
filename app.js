/**
 * Created by Grodfan on 2017-02-20.
 */

var express = require('express');
var connection = require('./connection');
var bodyparser = require('body-parser');
var routes = require('./routes');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(function(req, res, next) {
   res.header('Access-Control-Allow-Origin', "*");
   res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type');
   next();
})

connection.init();
routes.configure(app);

app.use(express.static(__dirname + '/public'));

var server = app.listen(8000, function(){
   console.log('Server up and running:'  + server.address().port);
});