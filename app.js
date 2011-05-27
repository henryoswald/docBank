
/**
 * Module dependencies.
 */

var express = require('express');
var sys = require('sys');
var app = module.exports = express.createServer();
//var documents = require('./app/models/Paper.js');
//var Paper = documents.Paper;

var Paper = require('./app/controllers/Paper_controller.js');


var documents2 = require('./app/models/User.js');
var User = documents2.User;

require.paths.unshift(__dirname+'/config');


// Configuration
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



// Root

app.get('/', function(req, res){
  res.redirect('/paper');
});


// 
app.get('/paper/new',Paper.create);
app.post('/paper',Paper.doCreate);
app.get('/paper',Paper.list);
app.get('/paper/:id',Paper.list2);
app.get('/paper/:id/edit',Paper.edit);
app.del('/paper/:id',Paper.del);

app.get('/user', function(req, res){
  res.render('security/new', {
    title: 'New'
  });
});


// Create/Update users
app.post('/user', function(req, res){
   user = new User(req.body.user);
    user.save(function(err){
      console.log("User Created");
    });
	res.redirect('/user');
});




// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port)
}
