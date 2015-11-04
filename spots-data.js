var spotsData = [
  {
  	name: 'Hollywood High',
  	picture: 'http://media.tumblr.com/tumblr_l9d3afUYUx1qd6ehe.jpg',
  	state: 'CA',
  	type: 'stairs'
   },
  {
  	name: 'Belmont',
  	picture: 'http://i.ytimg.com/vi/q6wWxXnXAiQ/hqdefault.jpg',
  	state: 'CA',
  	type: 'stairs'
  },
  {
  	name: 'Wilshire',
  	picture: 'http://www.whyelfiles.com/wf-navigator/wp-content/uploads/2013/02/la-skating-and-spots-092.jpg',
  	state: 'CA',
  	type: 'stairs'
  },
  {
  	name: 'Lockwood',
  	picture: 'http://onefelix.com/wp-content/uploads/2011/01/LockWood.jpg',
  	state: 'CA',
  	type: 'ledges'
  },
  {
  	name: 'JKwon Plaza',
  	picture: 'http://www.whyelfiles.com/wf-navigator/wp-content/uploads/2013/02/la-skating-and-spots-121.jpg',
  	state: 'CA',
  	type: 'ledges'
  },
  {
  	name: 'Staples Center',
  	picture: 'http://www.skateallcities.com/wordpress/wp-content/uploads/2009/01/2009-01-conventioncenterledges01.jpg',
  	state: 'CA',
  	type: 'ledges',
  },
  {
  	name: 'Santa Monica Gap',
  	picture: 'https://s-media-cache-ak0.pinimg.com/originals/c7/48/1f/c7481fba6e469ea28029cf8c9763bc0d.jpg',
  	state: 'CA',
  	type: 'gaps'
  },
  {
  	name: 'UC Davis Ivy Gap',
  	picture: 'http://i18.photobucket.com/albums/b104/slimpink/P1050036.jpg',
  	state: 'CA',
  	type: 'gaps'
  },
  {
  	name: 'Wallenberg',
  	picture: 'http://skately.com/img/library/spots/large/wallenberg-high-school.jpg',
  	state: 'CA',
  	type: 'gaps'
  },
  {
    name: 'Trio Ledges',
    picture: 'http://i55.photobucket.com/albums/g157/zoulet/skatespots/SAM_0245.jpg',
    state: 'CO',
    type: 'ledges',
  },
  {
    name: 'Blake St. Ledge',
    picture: 'http://1.bp.blogspot.com/-GWUvViD-DZw/TySB5JtF4eI/AAAAAAAAII4/vtxUULCzCw8/s1600/IMAG0119.jpg',
    state: 'CO',
    type: 'ledges',
  },
  {
    name: 'Mall Ledge',
    picture: 'http://www.nullozinejr.com/zine/wp-content/uploads/2015/01/IMG_20150111_094308.jpg',
    state: 'CO',
    type: 'ledges',
  },
  {
    name: 'The Ditch',
    picture: 'http://content.milkmade.com/files/21417/medium/3.3.jpg?1411570506',
    state: 'CO',
    type: 'gaps',
  },
  {
    name: 'Dental Gap',
    picture: 'http://www.whyelfiles.com/wf-navigator/wp-content/uploads/2013/02/DSC02262.jpg',
    state: 'CO',
    type: 'gaps',
  },
  {
    name: 'Boulder Gap',
    picture: 'http://2.bp.blogspot.com/-HYVg6P2q1G4/Tr4BTQtunvI/AAAAAAAAADo/f3emiCRlD9w/s320/gap1.JPG',
    state: 'CO',
    type: 'gaps',
  },
  {
    name: 'Civic Center',
    picture: 'http://www.caughtinthecrossfire.com/uploads/2013/11/julian_Christianson_skate.jpg',
    state: 'CO',
    type: 'stairs',
  },
  {
    name: 'Junction 11',
    picture: 'http://www.eden.rutgers.edu/~wmf28/425/final/images/11raillarge.jpg',
    state: 'CO',
    type: 'stairs',
  },
  {
    name: 'Arvada High',
    picture: 'http://i.imgur.com/r4wPBBb.png',
    state: 'CO',
    type: 'stairs',
  }


];

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/spotUp');
var Spots = require('./models/spots');

spotsData.forEach(function(spotData) {
	var spot = new Spots(spotData);
	spot.save();
});