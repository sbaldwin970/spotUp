var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');



var usersSchema = new Schema({
	name : String,
	email : String,
	password : String,
});

usersSchema.pre('save', function(next){

  // First, check to see if the password has been modified. If not, just move on.
  if(!this.isModified('password')) return next();

  // Store access to "this", which represents the current user document
  var user = this;

  // Generate an encryption "salt." This is a special way of increasing the
  // encryption power by wrapping the given string in a secret string. Something
  // like "secretpasswordsecret" and then encrypting that result.
  bcrypt.genSalt(10, function(err, salt){

    // If there was an error, allow execution to move to the next middleware
    if(err) return next(err);

    // If we are successful, use the salt to run the encryption on the given password
    bcrypt.hash(user.password, salt, function(err, hash){

      // If there was an error, allow execution to move to the next middleware
      if(err) return next(err);

      // If the encryption succeeded, then replace the un-encrypted password
      // in the given document with the newly encrypted one.
      user.password = hash;

      // Allow execution to move to the next middleware
      return next();
    });
  });
});


/**
 * Method on the user schema that allows us to hook into the
 * bcrypt system to compare an encrypted password to a given
 * password. This process doesn't involve unencrypting the stored
 * password, but rather encrypts the given one in the same way and
 * compares those values
 */
// Constructor.prototype.comparePassword
usersSchema.methods.comparePassword = function(candidatePassword, next){
  // Use bcrypt to compare the unencrypted value to the encrypted one in the DB
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    // If there was an error, allow execution to move to the next middleware
    if(err) return next(err);

    // If there is no error, move to the next middleware and inform
    // it of the match status (true or false)
    return next(null, isMatch);
  });
};


// var afterCompare = function(err, match){
//   if(match){
//     do the stuff
//   }
//   else{
//     dont do the stuff
//   }
// }

// billyBob.comparePassword(req.body.password, afterCompare)



var Users = mongoose.model('users', usersSchema);
module.exports = Users;
