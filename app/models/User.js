var common = require('../../common/common');

var mongoose = require('mongoose');
mongoose.connect(common.settings.mongodb_url);

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// User schema
var User = new Schema({
  email					: {type : String, default : ''},
  password			: {type : String, default : ''},
	reference_ids : [ObjectId],
	referee_ids	  : [ObjectId]
});

mongoose.model('User', User);
exports.User = mongoose.model('User');
