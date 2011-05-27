var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bank');
Schema = mongoose.Schema,

module.exports.schema = Schema;
module.exports.mongoose = mongoose;


