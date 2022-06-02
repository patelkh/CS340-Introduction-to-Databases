/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
const path = require("path");

var app = express();
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        });

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'handlebars'); //default view engine 
app.set('port', process.argv[2] || 3000);
app.set('mysql', mysql);
app.use('/', express.static('public'));
app.use('/customers', require('./customers.js'))
app.use('/employees', require('./employees.js'))
app.use('/orders', require('./orders.js'))
app.use('/customfeatures', require('./customfeatures.js'))
app.use('/wheelsets', require('./wheelsets.js'))
app.use('/bodies', require('./bodies.js'))
app.use('/finishes', require('./finishes.js'))
app.use('/batteries', require('./batteries.js'))


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(process.env.PORT || 3000, function(){
  console.log('Express started on ' + app.get('port') + '; press Ctrl-C to terminate.');
});
