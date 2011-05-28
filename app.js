// ------------ DEPENDENCYS --------------
var express = require('express');
var sys = require('sys');
var crypto = require('crypto');
var app = module.exports = express.createServer();

//TODO WTF does this do?
require.paths.unshift(__dirname+'/config');

// ------------ CONFIGERATION ----------

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
var Paper = require('./app/controllers/Paper_Controller.js');
var User = require('./app/controllers/User_Controller.js');

// ----------------- PATHS--------------
app.get('/', function(req, res){
  res.redirect('/paper');
	console.log(req.session);
	console.log('-----------');
	console.log(req.session.user);
	
});

// Paper 
app.get('/paper/new',Paper.createForm);
app.post('/paper',Paper.create);
app.get('/paper',Paper.list);
app.get('/paper/:id',User.requiresLogin,Paper.list2);
app.get('/paper/:id/edit',Paper.edit);
app.del('/paper/:id',Paper.del);

// User 
app.get('/user', User.createForm);
app.post('/user', User.create);
app.get('/login', User.loginForm);
app.post('/login', User.login);
app.get('/logout', User.logout);


// Only listen on $ node app.js
if (!module.parent) {
  app.listen(3000);
  console.log("Running on port %d", app.address().port)
}
