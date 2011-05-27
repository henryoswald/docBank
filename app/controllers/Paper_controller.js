var Paper = require('../models/Paper.js').Paper;

// New paper
exports.create = function(req, res){
  res.render('paper/new', {
    title: 'New'
  });
};


// Create/Update papers
exports.doCreate = function(req, res){
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

};



// List
exports.list = function(req, res){
	console.log("list");
  Paper.find({}, function(err, docs) {
    res.render('paper/index', {
      title: 'List of papers',
      papers: docs
    });
  });
};


// View an paper
// TODO merge this method
exports.list2 = function(req, res){
	console.log(req.params.id);
  Paper.findOne({_id:req.params.id}, function(err,paper){
    res.render('paper/show', {
			
      title: paper.doc.title,
      paper: paper.doc
    });
  });
};

// Edit an paper
exports.edit = function(req, res){
	console.log("Edit");
  Paper.findOne({_id:req.params.id}, function(err,paper){
		console.log(paper);
    res.render('paper/edit', {
      title: "Title",
      paper: paper
    });
  });
};

// Delete an paper
exports.del = function(req, res){
  Paper.findOne({_id:req.params.id}, function(err,paper){
    paper.remove(function(err){
      console.log(err);
    });
  });
  res.redirect('/paper');
};



