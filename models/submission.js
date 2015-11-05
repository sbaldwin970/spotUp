var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var submissionSchema = new Schema({
	videoId : String,
	spot : {type: Schema.Types.ObjectId, ref: 'spots'},
	userSubmitted : {type: Schema.Types.ObjectId, ref: 'users'},
	timeStamp : Date,
	rating : Number,
	usersRated : Number

});

var Submissions = mongoose.model('submissions', submissionSchema);
module.exports = Submissions;

