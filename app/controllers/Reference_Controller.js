var Reference = require('../models/Reference.js').Reference;
var utils = require('../../utils/utils');


// New reference
exports.createForm = function(req, res){
  res.render('reference/new', {
    title: 'New'
  });
};


exports.requestForm = function(req, res){
	console.log(' rendering request form');
	res.render('reference/request/new', {
    title: 'Requesting Reference'
	});
}

exports.request = function(req, res){
	reference = new Reference(req.body.reference);
    reference.save(function(err){
			console.log("Reference Created");
			utils.email.sendEmail(req.body.referee_email, 
											req.session.user.email +' has requested a reference for ' +req.body.reference.position, 
											'"'+req.body.email_body +'"'
										 );
		});
	res.redirect('/reference');	
};

// Create/Update references
//exports.create = function(req, res){
//	if(req.body.reference._id)
//    Reference.findOne({_id:req.body.reference._id}, function(err, a) {
//      a.title = req.body.reference.title;
//      a.body = req.body.reference.body;
//      a.save(function(err) {
//        console.log(err);
//      })
//    });
//  else {
//    reference = new Reference(req.body.reference);
//    reference.save(function(err){
//      console.log(reference);
//      console.log("Reference Created");
//    });
//  }
//  res.redirect('/reference');
//};
//
//var ObjectId = Reference.ObjectId;
//

// List
exports.list = function(req, res){
	Reference.find({'candidate_Id': req.session.user._id}, function(err, docs) {
    res.render('reference/index', {
      title: 'List of references',
      references: docs
    });
  });
};

// View an reference
// TODO merge this method
exports.detial = function(req, res){
	console.log(req.params.id);
  Reference.findOne({_id:req.params.id}, function(err,reference){
    res.render('reference/show', {
      title: reference.doc,
      reference: reference.doc
    });
  });
};

// Edit an reference
exports.edit = function(req, res){
	console.log("Edit");
  Reference.findOne({_id:req.params.id}, function(err,reference){
		console.log(reference);
    res.render('reference/edit', {
      title: "Title",
      reference: reference
    });
  });
};

// Delete an reference
exports.del = function(req, res){
  Reference.findOne({_id:req.params.id}, function(err,reference){
    reference.remove(function(err){
      console.log(err);
    });
  });
  res.redirect('/reference');
};
