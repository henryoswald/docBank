var User = require('../models/User.js').User;

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

// redner login form
exports.loginForm = function(req,res){
	console.log(req.query);
	res.render('security/login', {
      title: 'login',
			redir: req.query.redir
	});
}

// adds user to session
exports.login = function(req,res){
	User.findOne({email: req.body.user.email, password: req.body.user.password}, function(err, user) {
		if(user) {
			req.session.user = user;
			console.log('loged in '+ user._id);
			res.redirect('/')
    } else {
      console.log('Failed login');
      res.redirect('/login')
    }
  })
}

// destroy session
exports.logout = function(req,res){
	if(req.session.user){
		req.session.destroy(function(){
		});		
	}
	res.redirect('/login');
}

