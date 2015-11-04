var Spots = require('../models/spots');

var Submissions = require('../models/submission')

var url = require('url');

// Takes a URL and attempts to extract a YouTube video ID from it. Returns
// the video ID on success, or null on failure.
function getYouTubeVideoIDFromURL(urlString) {
  var parsedUrl = url.parse(urlString, true);

  if (parsedUrl.query && parsedUrl.query.v) {
    return parsedUrl.query.v;
  } else if (parsedUrl.hostname === 'youtu.be') {
    return parsedUrl.pathname.slice(1);
  } else {
    return null;
  }
}

module.exports = {
	getSpots : function(req, res) {
		Spots.find({}, function(err, data){
			res.send(data)
		})

	},
	upload : function(req, res) {
		console.log("Entering upload")
		var videoId = getYouTubeVideoIDFromURL(req.body.videoUrl);
		if(videoId == null) {
			res.send(false); 
			console.log("Didn't like URL")
		}
		else {
			var submit = new Submissions({
				videoId : videoId,
				spot : req.body.spot,
				userSubmitted : req.user._id,
				timeStamp : new Date(),
			});

			console.log("Made submission")

			submit.save(function(err, submission) {
				console.log("Callback", err, submission)
				if(err) {
					res.send(false);
				}
				else {
					res.send(submission);
				}
			})
		}
	},
	submissions : function(req, res) {
		Submissions.find({spot: req.params.spotId}).populate('userSubmitted').exec(function(err, data) {
			res.send(data)
		})
	},
	userVids : function(req, res) {
	Submissions.find({userSubmitted : req.user._id}, function(err, doc){
			res.send(doc)
		})
	}
}


