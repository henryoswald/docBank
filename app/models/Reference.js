var common = require('../../common/common');
var sys = require('../../common/common').sys;

var User = require('./User.js').User;

var mongoose = require('mongoose');
mongoose.connect(common.settings.mongodb_url);

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// Reference schema
var ReferenceSchema = new Schema({
  position			: {type : String, default : ''},
  body					: {type : String, default : ''},
  start_date		: {type : Date,	  default : ''},
  end_date			: {type : Date,   default : ''},
  created_date  : {type : Date,   default : Date.now},
  updated_date  : {type : Date,   default : Date.now},
	filled_in			: {type : Boolean, default : false},
  candidate_id  : {type : ObjectId},
  access_ids    : [ObjectId],
  referee_id    : {type : ObjectId}
});

mongoose.model('Reference', ReferenceSchema);
exports.Reference = mongoose.model('Reference');
exports.ReferenceSchema = ReferenceSchema;
