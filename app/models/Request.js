var settings = require('../../config/settings');

var mongoose = require('mongoose');
mongoose.connect(settings.mongodb_url);

// User schema
var Request = new mongoose.Schema({
  refEmail 		: {type : String, default : ''},
	userID			:  ObjectId, 
});
  
mongoose.model('Request', Request);

exports.User = mongoose.model('Request');

