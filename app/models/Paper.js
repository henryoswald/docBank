var settings = require('../../config/Settings');

var mongoose = require('mongoose');
mongoose.connect(settings.mongodb_url);


// Paper schema
var Paper = new mongoose.Schema({
  Position			: {type : String, default : '', required : true},
  body					: {type : String, default : ''},
  start_date		: {type : Date,	  default : ''},
  end_date			: {type : Date,   default : ''},
  created_date  : {type : Date,   default : Date.now},
  updated_date  : {type : Date,   default : Date.now}
});
  
mongoose.model('Paper', Paper);

//export the schama 
exports.Paper = mongoose.model('Paper');



