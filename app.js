// ------------ DEPENDENCYS --------------
var express = require('express');
var sys = require('sys');
var crypto = require('crypto');
//var email = require('./node_modules/mailer/lib/node_mailer');

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

//User.requiresLogin
// Reference
app.get('/test', function(req, res){
 res.render('test', {
    title: 'Requesting Reference'
  });
});
 
app.get('/reference/request/new',User.requiresLogin, Reference.requestForm);
app.post('/reference/request/new',User.requiresLogin, Reference.request);

app.get('/reference', User.requiresLogin,  Reference.list); //lists that users references
app.get('/reference/:id',User.requiresLogin, Reference.detail); //shows that reference in detial
app.get('/reference/:id/edit',User.requiresLogin, Reference.editForm);
app.post('/reference/:id/edit',User.requiresLogin, Reference.edit);

app.del('/reference/:id', Reference.del);

// User
app.get('/register', User.createForm);
app.post('/user', User.create);
app.get('/login', User.loginForm);
app.post('/login', User.login);
app.get('/logout', User.logout);

// Only listen on $ node app.js
var port = process.env.PORT || 3000;
if (!module.parent) {
  app.listen(port);
  console.log("Running on port %d", app.address().port)
}
