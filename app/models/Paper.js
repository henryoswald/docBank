var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bank');
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

// Paper schema

var Paper = new Schema({
  Position		: {type : String, default : '', required : true},
  body			: {type : String, default : ''},
  start_date	: {type : Date,	  default : ''},
  end_date		: {type : Date,   default : ''},
  created_date  : {type : Date,   default : Date.now},
  updated_date  : {type : Date,   default : Date.now}
});
  
mongoose.model('Paper', Paper);
var Paper = exports.Paper = mongoose.model('Paper');
