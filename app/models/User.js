var settings = require('../../config/settings');

var mongoose = require('mongoose');
mongoose.connect(settings.mongodb_url);

// User schema
var User = new mongoose.Schema({
  email 		: {type : String, default : ''},
  password		: {type : String, default : ''},
});
  
mongoose.model('User', User);

exports.User = mongoose.model('User');

