var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var submissionSchema = new Schema({
	videoId : String,
	spot : {type: Schema.Types.ObjectId, ref: 'spots'},
	userSubmitted : {type: Schema.Types.ObjectId, ref: 'users'},
	timeStamp : Date,

});

var Submissions = mongoose.model('submissions', submissionSchema);
module.exports = Submissions;

