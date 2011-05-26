
/**
 * Module dependencies.
 */

var express = require('express');
var sys = require('sys');
var app = module.exports = express.createServer();
var models = require('./models/reference.js');
var Paper = models.Paper;

// Configuration
// no sass in here becuse we use Compass compiler
app.configure(function(){
  app.set('views', __dirname + '/views');
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


// Paper Routes

// Listing of papers
app.get('/paper', function(req, res){
  Paper.find({}, function(err, docs) {
    res.render('paper/index', {
      title: 'List of papers',
      papers: docs
    });
  });
});

// New paper
app.get('/paper/new', function(req, res){
  res.render('paper/new', {
    title: 'New'
  });
});

// Create/Update papers
app.post('/paper', function(req, res){
  if(req.body.paper._id)
    Paper.findOne({_id:req.body.paper._id}, function(err, a) {
      a.title = req.body.paper.title;
      a.body = req.body.paper.body;
      a.save(function(err) {
        console.log(err);
      })
    });
  else {
    paper = new Paper(req.body.paper);
    paper.save(function(err){
      console.log("Created");
    });
  }

  res.redirect('/paper');

});

// View an paper
app.get('/paper/:id', function(req, res){
  Paper.findOne({_id:req.params.id}, function(err,paper){
    res.render('paper/show', {
      title: paper.doc.title,
      paper: paper.doc
    });
  });
});

// Edit an paper
app.get('/paper/:id/edit', function(req, res){
  Paper.findOne({_id:req.params.id}, function(err,paper){
    res.render('paper/new', {
      title: paper.doc.title,
      paper: paper.doc
    });
  });
});

// Delete an paper
app.del('/paper/:id', function(req, res){
  Paper.findOne({_id:req.params.id}, function(err,paper){
    paper.remove(function(err){
      console.log(err);
    });
  });
  res.redirect('/paper');
});





// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port)
}
