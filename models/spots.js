var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var spotsSchema = new Schema({
	name : String,
	picture : String,
	state : String,
	// 'ledges', 'stairs', 'gaps'
	type : String,
});

var Spots = mongoose.model('spots', spotsSchema);
module.exports = Spots;
