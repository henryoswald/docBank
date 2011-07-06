var User = require('../models/User.js').User;
var Reference = require('../models/Reference.js').Reference;
var Common = require('../../common/common');

//render register form
exports.createForm = function(req, res){
  res.render('security/register', {
    title: 'Register',
		user: new User()
  });
};

// Create/Update users
exports.create = function(req, res){
  user = new User(req.body.user);
	console.log(req.body.password1 +' '+ req.body.password2);
	if(req.body.password1 != req.body.password2){
	 	req.flash('error', '4Incorrect credentials');			
	 	req.flash('info', '4Incorrect credentials');			

		res.render('security/register', {
			title: 'Register',
			user: user
		});
	}else{
		user.password=req.body.password1;
	  user.save(function(err){
 	    console.log(user);
 	  	req.flash('error', '2Incorrect credentials');		
 	  	res.redirect('/');	
 	  });
	}
};

// redner login form
exports.loginForm = function(req,res){
	res.render('security/login',
					 	{ title: 'login', 
							redir: req.query.redir
						});
}

// adds user to session
exports.login = function(req,res){
	User.findOne({email: req.body.user.email, password: req.body.user.password}, function(err, user) {
		if(user) {
			req.session.user = user;
			Common.sys.puts((user.email+' loged in ('+ user._id+')').blue);
			res.redirect(req.body.redir ? req.body.redir : '/') //if there is a redir use it if not go home
    } else {
      console.log('Failed login');
      res.redirect('/login')
    }
  })
}

// checks if user is loged in
exports.requiresLogin = function(req, res, next){
	if(req.session.user){
		next();
	}else{
		res.redirect('login?redir='+req.url);				
	}
}

var getReference = function(res, ref_id, callback){
	Reference.findOne({'_id':ref_id}, function(err, reference){
		if(reference){
			callback(reference);
		}else{
			res.render('error/404', {
				title: "404",
			});
		}
	});
}


exports.hasAccess = function(req, res, next){
	if(!req.session.user){
		res.redirect('login?redir='+req.url);
		return;		
	}
	getReference(res, req.params.ref_id, function(reference){
		if (reference.access_ids.indexOf(req.session.user._id) > -1) {
			next(); //user has been granted permission
		} else if (reference.candidate_id == req.session.user._id){
			next(); //reference is about user
		}else{
			res.render('security/restricted', {
				title: "Resctricted",
				reference: reference
			});
		}
	});
}

exports.grantAccessForm = function(req, res){
	res.render('security/grantAccess', {
		title:'Grant User Access'
	});
}

exports.grantAccess = function(req,res){
	User.findOne({'email':req.body.email}, function(err, user){
		if(user){
			Reference.find({'candidate_id':req.session.user._id}, function(err, references){
			//loop through all the loged in users references adding the granted users id
			for(var i in references){
				var ref = references[i];
				//ref.access_ids.push(req.session.user._id);
				ref.access_ids.push(user._id);
				ref.save();
				console.log(references[i].position);
			}
		});
		}else{
			console.log(req.params.email+' not on the system');
		}
	});
}





// destroy session
exports.logout = function(req,res){
	if(req.session.user){
		req.session.destroy(function(){
		});		
	}
	res.redirect('/login');
}

