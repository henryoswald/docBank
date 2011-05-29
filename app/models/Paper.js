var settings = require('../../config/Settings');

var mongoose = require('mongoose');
mongoose.connect(settings.mongodb_url);

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// Paper schema
var Paper = new Schema({
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

mongoose.model('Paper', Paper);

exports.Paper = mongoose.model('Paper');
exports.ObjectId = ObjectId; //todo pop this in line 7?

