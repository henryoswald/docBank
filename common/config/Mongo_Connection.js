var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bank');

module.exports.mongoose = mongoose;


