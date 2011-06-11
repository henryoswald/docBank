var Reference = require('../models/Reference.js').Reference;
var User = require('../models/User.js').User;
var common = require('../../common/common');

// New reference
exports.createForm = function(req, res){
  res.render('reference/new', {
    title: 'New'
  });
};


//render the request form
exports.requestForm = function(req, res){
	console.log(' rendering request form');
	res.render('reference/request/new', {
    title: 'Requesting Reference'
	});
}


//do the request
exports.request = function(req, res){
	reference = new Reference(req.body.reference);
	User.findOne({'_id': req.session.user._id}, function(err, user) {
			//add the reference id to the users refree list
			console.log(reference.position);
			console.log(reference.created_date);
			
			if(user){
				//insert the new reference to the referee id
				r = new Reference({position: 'ppp'});
				user.references.push(r);
				user.save();
			};
	});
	res.redirect('/reference');	
};


// List
exports.list = function(req, res){
	User.findOne({'_id': req.session.user._id}, function(err, user) {
			res.render('reference/index', {
				title: 'List of references',
				references: user.references
			});
  });
};


// View an reference in detial
exports.detail = function(req, res){
  Reference.findOne({_id:req.params.id}, function(err,reference){
    res.render('reference/detail', {
      title: reference.doc,
      reference: reference.doc
    });
  });
};


// Edit an reference
exports.editForm = function(req, res){
	Reference.findOne({_id:req.params.id}, function(err,reference){
		res.render('reference/edit', {
      title: "Edit Reference",
      reference: reference
    });
  });
};


// Edit an reference
exports.edit = function(req, res){
	if(req.body.reference._id)
    Reference.findOne({_id:req.body.reference._id}, function(err, a) {
			a.position = req.body.reference.position;
      a.body = req.body.reference.body;
      a.start_date = req.body.reference.start_date;
      a.end_date = req.body.reference.end_date;			
      a.save(function(err) {
        console.log(err);
      })
    });
  res.redirect('/reference');
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


				//send and e-mail to the user asking them to fill it in
		//			common.email.sendEmail(referee.referee_email, 
		//								req.session.user.email +' has requested a reference for ' + reference.position, 
		//								'"'+req.body.email_body +'" <a href="'+common.settings.url+'reference/'+reference._id+'/edit"> click here</a>'
 		//							 );

