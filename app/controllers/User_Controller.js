var User = require('../models/User.js').User;
var Common = require('../../common/common');

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

// redner login form
exports.loginForm = function(req,res){
	res.render('security/login',
					 	{ title: 'login', redir: req.query.redir});
}
//req.query.redir
// checks if user is loged in
exports.requiresLogin = function(req, res, next){
	if(req.session.user){
		next();
	}else{
		res.redirect('login?redir='+req.url);				
	}
}

// checks if user is loged in
exports.isReferee = function(req, res, next){
	if(req.session.user){
		var user = req.session.user;		
		console.log(user);	
	}else{
		res.redirect('login');				
	}
}

//render register form
exports.createForm = function(req, res){
  res.render('security/new', {
    title: 'New'
  });
};


// Create/Update users
exports.create = function(req, res){
   user = new User(req.body.user);
    user.save(function(err){
      console.log("User Created");
      console.log(user);			
    });
	res.redirect('/');
};



// destroy session
exports.logout = function(req,res){
	if(req.session.user){
		req.session.destroy(function(){
		});		
	}
	res.redirect('/login');
}

