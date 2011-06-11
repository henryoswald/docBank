var common = require('../../common/common');
var Reference = require('../models/Reference.js').ReferenceSchema;

var mongoose = require('mongoose');
mongoose.connect(common.settings.mongodb_url);

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// User schema
var UserSchema = new Schema({
  email					: {type : String, default : ''},
  password			: {type : String, default : ''},
	references	  : [Reference]
});

mongoose.model('User', UserSchema);
exports.User = mongoose.model('User');
