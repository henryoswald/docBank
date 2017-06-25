var Reference = require('../models/Reference.js').Reference;
var User = require('../models/User.js').User;
var common = require('../../common/common');
var sys = require('../../common/common').sys;

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


//create a new request
exports.request = function(req, res){
  var reference = new Reference(req.body.reference);
  reference.save();		
	User.find({'email':req.body.email_body}, function (err, user){
		if(user){
		//email is already accociated with an account, TODO give permission to the user
		var subject = req.session.user.email +' has requested a reference for ' + reference.position;
		var message = req.body.email_body +'" <a href="'+common.settings.url+'/reference/confirm/'+reference._id+'> click here</a>'; 
		common.email.sendEmail(referee.referee_email, subject, message); 
		}
	});
  res.redirect('/reference'); 
};


    //send and e-mail to the user asking them to fill it in
    //      common.email.sendEmail(referee.referee_email, 
    //                req.session.user.email +' has requested a reference for ' + reference.position, 
    //                '"'+req.body.email_body +'" <a href="'+common.settings.url+'reference/'+reference._id+'/edit"> click here</a>'
    //               );

// List
exports.list = function(req, res){
	var user_id;
	if(req.params.user_id){
		user_id = req.params.user_id;
	}else{
		user_id = req.session.user._id;
	}
  Reference.find({'candidate_id': user_id}, function(err, references) {
    console.log('getting sessions references : '+user_id);
      res.render('reference/index', {
        title: 'List of references',
        references: references
      });
  });
};


// View an reference in detial
exports.detail = function(req, res){
  Reference.findOne({'_id':req.params.ref_id}, function(err,reference){
		if(reference){
			res.render('reference/detail', {
  	    title: 'Reference x',
  	    reference: reference
  	  });
		}else{
			res.redirect('/');
		}
  });
};

exports.confirmForm = function(req, res){
	Reference.findOne({_id:req.params.ref_id}, function(err,reference){
		console.log('confirming'+req.params.ref_id);
    res.render('reference/confirm', {
      title: "Edit Reference",
      reference: reference
    });
  });
};

// Edit an reference
exports.editForm = function(req, res){
  Reference.findOne({_id:req.params.ref_id}, function(err,reference){
    res.render('reference/edit', {
      title: "Edit Reference",
      reference: reference
    });
  });
};


// Edit an reference
exports.edit = function(req, res){
    Reference.findOne({_id:req.params.ref_id}, function(err, ref) {
      
			//need to individuall update the values
			ref.position = req.body.reference.position;
      ref.start_date = req.body.reference.start_date;
      ref.end_date = req.body.reference.end_date;
			ref.updated_date = new Date();
      ref.leaving_reason = req.body.reference.leaving_reason;
      ref.salary = req.body.reference.salary;
			
			if(req.body.reference.confirmed){
				ref.confirmed = req.body.reference.confirmed;
			}
      ref.save(function(err) {
        console.log(err);
      })
    });
  res.redirect('/reference');
};


// Delete an reference
exports.del = function(req, res){
  Reference.findOne({_id:req.params.ref_id}, function(err,reference){
    reference.remove(function(err){
      console.log(err);
    });
  });
  res.redirect('/reference');
};


// Create/Update references
//exports.create = function(req, res){
//  if(req.body.reference._id)
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




