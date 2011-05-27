var User = require('../models/User.js').User;


exports.create = function(req, res){
  res.render('security/new', {
    title: 'New'
  });
};


// Create/Update users
exports.doCreate = function(req, res){
   user = new User(req.body.user);
    user.save(function(err){
      console.log("User Created");
    });
	res.redirect('/user');
};

