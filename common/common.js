


var month_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

exports.dateFormater = function (date){
	return month_names[date.getMonth()]+' '+date.getDate()+' '+date.getFullYear()
}

module.exports.email = require('./utils/Email');
module.exports.settings = require('./config/Settings');
module.exports.mongoose =  require('./config/Mongo_Connection');
