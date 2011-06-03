var common = require('../../common/common');

var mongoose = require('mongoose');
mongoose.connect(common.settings.mongodb_url);

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// Reference schema
var Reference = new Schema({
  candidate_Id	: {type : ObjectId},
  referee_Id		: {type : ObjectId},
  position			: {type : String, default : ''},
  body					: {type : String, default : ''},
  start_date		: {type : Date,	  default : ''},
  end_date			: {type : Date,   default : ''},
  created_date  : {type : Date,   default : Date.now},
  updated_date  : {type : Date,   default : Date.now},
	filled_in			: {type: Boolean, default : false}
});

mongoose.model('Reference', Reference);
exports.Reference = mongoose.model('Reference');
