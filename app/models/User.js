var settings = require('../../config/settings');

var mongoose = require('mongoose');
mongoose.connect(settings.mongodb_url);
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;


// User schema
var User = new Schema({
  email 		: {type : String, default : ''},
  password		: {type : String, default : ''},
});
  
mongoose.model('User', User);
var User = exports.User = mongoose.model('User');

