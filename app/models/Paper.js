var settings = require('../../config/Settings');

var mongoose = require('mongoose');
mongoose.connect(settings.mongodb_url);

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// Paper schema
var Paper = new Schema({
  candidates_Id	: {type : String},
  referee_Id		: {type : String},
  position			: {type : String, default : '', required : true},
  body					: {type : String, default : '', required : true},
  start_date		: {type : Date,	  default : '', required : true},
  end_date			: {type : Date,   default : ''},
  created_date  : {type : Date,   default : Date.now},
  updated_date  : {type : Date,   default : Date.now},
	filled_in			: {type: Boolean, default : false}
});

mongoose.model('Paper', Paper);

exports.Paper = mongoose.model('Paper');
