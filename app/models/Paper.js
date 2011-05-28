var settings = require('../../config/Settings');

var mongoose = require('mongoose');
mongoose.connect(settings.mongodb_url);

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// Paper schema
var Paper = new Schema({
  candidates_Id	: {type : ObjectId},
  referee_Id		: {type : ObjectId},		
  position			: {type : String, default : '', required : true},
  body					: {type : String, default : ''},
  start_date		: {type : Date,	  default : ''},
  end_date			: {type : Date,   default : ''},
  created_date  : {type : Date,   default : Date.now},
  updated_date  : {type : Date,   default : Date.now},
	filled_in			: {type: Boolean, default : false}
});

mongoose.model('Paper', Paper);

//export the schama 
exports.Paper = mongoose.model('Paper');
