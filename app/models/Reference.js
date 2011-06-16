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
	filled_in			: {type: Boolean, default : false}

});

ReferenceSchema.static('findEmbedded', function(_id ,callback){
	console.log('id:'+_id);
//	User.findOne({'references._id':_id}, function(err,user){
	User.findOne({"references._id":"4df931fb9d76810000000006"}, function(err,user){
		
		sys.puts(('User:'+user).red);
		for(var i = 0; i< user.doc.references.length; i++){
			if(user.doc.references[i]._id=req.params.id){
					return user.doc.references[i];
			}
		}
		
	},callback);
});

mongoose.model('Reference', ReferenceSchema);
exports.Reference = mongoose.model('Reference');
exports.ReferenceSchema = ReferenceSchema;
