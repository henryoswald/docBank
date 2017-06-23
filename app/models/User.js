var common = require('../../common/common');
var Reference = require('../models/Reference.js').ReferenceSchema;

var mongoose = require('mongoose');
mongoose.connect(common.settings.mongodb_url);

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// User schema
var UserSchema = new Schema({
  email					: {type : String, default : ''},
  first_name		: {type : String, default : ''},
  last_name			: {type : String, default : ''},
  password			: {type : String, default : ''},
});

mongoose.model('User', UserSchema);
exports.User = mongoose.model('User');
