var Paper = require('../models/Paper.js').Paper;

// New paper
exports.createForm = function(req, res){
  res.render('paper/new', {
    title: 'New'
  });
};


exports.requestForm = function(req, res){
	console.log(' rendering request form');
	res.render('paper/request/new', {
    title: 'Requesting Reference'
  
	});
}

exports.request = function(req, res){
	paper = new Paper(req.body.paper);
    paper.save(function(err){
			console.log("Reference Created");
			console.log(paper);	
		});
	res.redirect('/request/new');	
};

// Create/Update papers
exports.create = function(req, res){
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
      console.log(paper);
      console.log("Reference Created");
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
      title: paper.doc,
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
