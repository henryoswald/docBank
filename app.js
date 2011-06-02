// ------------ DEPENDENCYS --------------
var express = require('express');
var sys = require('sys');
var crypto = require('crypto');
//var email = require('./node_modules/mailer/lib/node_mailer');

var utils = require('./utils/utils');


var app = module.exports = express.createServer();

//TODO WTF does this do?
require.paths.unshift(__dirname+'/config');

// -------------- CONFIGERATION --------------

// no sass in here becuse we use Compass compiler
app.configure(function(){
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// dynamic helper to give access to session and flash object generically in 
// jade layouts
app.dynamicHelpers(
	{
		session: function(req, res){
			return req.session;
		},

		flash: function(req, res){
			return req.flash();
		},
	}	
);

// ----------- Controller Objects ---------
var Reference = require('./app/controllers/Reference_Controller.js');
var User = require('./app/controllers/User_Controller.js');

// ----------------- PATHS--------------
app.get('/', function(req, res){
  res.redirect('/reference');
});

// Reference
//
app.get('/reference/request/new', User.requiresLogin, Reference.requestForm);
app.post('/reference/request/new', User.requiresLogin, Reference.request);

app.get('/reference', User.requiresLogin, Reference.list);
//app.get('/reference/:id', User.requiresLogin, Reference.show);
app.get('/reference/:id/edit', User.requiresLogin, Reference.edit);
app.del('/reference/:id', User.requiresLogin, Reference.del);

// User
app.get('/register', User.createForm);
app.post('/user', User.create);
app.get('/login', User.loginForm);
app.post('/login', User.login);
app.get('/logout', User.logout);

app.get('/email', function(){
	email.sendEmail('henry.oswald@gmail.com', 'subje', 'hello');
});

// Only listen on $ node app.js
if (!module.parent) {
  app.listen(3000);
  console.log("Running on port %d", app.address().port)
}
