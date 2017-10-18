const AuthToken = require('../models/AuthToken')
const User = require('../models/User')
const utils = require('../utils/utils')

var functions = {

  validateUser: function (token, callback) {
    function onUserFound(err, user) {
      console.log("onUserFound", err, user);
      if(err) return callback(err, null)
      if(!user) return callback(new Error('No user found'), null);
      callback(null, user);
    }

    function onAuthToken(err, authToken) {
      if(err) return callback(err, null)
      if(!authToken) return callback(new Error('No user found'), null);
      if(authToken.expiry < Date.now()) {
        authToken.remove();
        callback(new Error('Auth Token expired'), null)
        return
      }
      console.log("onAuthToken", authToken.user._id)
      User.findOne({ _id : authToken.user.id }, onUserFound)
    }
    AuthToken.findOne({ 'token' : token }, onAuthToken)
  },

  performUserRegistration: function (params, callback) {

    function onPasswordGenerated(error, password) {
      if(error) {
        callback(error, null);
        return
      }
      params.password = password
      var user = new User(params)
      user.save(function (err, user) {
        if(err || !user) {
          callback(err, user)
          return
        }
        // sendRegistrationEmail(user.email, function () {
        //   callback(err, user)
        // })
        callback(err, user)
      })
    }
    // This executes first
    utils.hashPassword(params.password, onPasswordGenerated)
  },

  performLogin: function (params, callback) {
    var attempts = 3;

    function addAuthToken(params) {
      var authToken = new AuthToken(params)
      authToken.save(function (err, authToken) {
        if(err) {
          if(err.code == 11000) {
            console.log(err)
            if(attempts < 0) {
              callback(new Error('Try logging in later'), null);
              return;
            }
            generateAuthToken(params.userid);
          } else {
            callback(err, null);
            return;
          }
        }
        if(!authToken) {
          callback(new Error('Null authToken returned'), null);
          return;
        }
        AuthToken.populate(authToken, {path: 'user'}, function (err, doc) {
          callback(null, doc);
        })
      })
    }

    function generateAuthToken(userid) {
      attempts--;
      var params = {
        token : utils.uuid(64),
        user : userid,
        expiry : Date.now() + 3 * 86400 * 1000
      }

      AuthToken.findOneAndRemove({ user : userid }, function (err, removedDoc) {
        if(err) {
          callback(err, null);
          return;
        }
        addAuthToken(params);
      });
    }

    function onPasswordGenerated(error, password) {
      if(error) {
        callback(error, null);
        return
      }
      var searchFields = {
        'email' : params.email,
        'password' : password
      };

      User.findOne(searchFields, function (err, user) {
        if(err) {
          console.log(err)
          callback(err, null);
          return
        }
        if(!user) {
          callback(new Error('User not found'), null);
          return;
        }
        generateAuthToken(user.id);
      })
    }

    //this executes first
    utils.hashPassword(params.password, onPasswordGenerated)
  },

  sendRegistrationEmail: function (email, callback) {
    callback();
  },

  isAdmin: function (token, callback) {

    function onTokenFound(authToken) {
      User.findOne({id:authToken.user}, function (err, user) {
        if(err) {
          callback(err);
          return;
        }
        if(!user) {
          callback(new Error('No user found'));
          return;
        }
        if(user.type != 'admin') {
          callback(new Error('Unauthorized'));
        }
        callback(null, user);
      })
    }

    AuthToken.findOne({token : token}, function (err, authToken) {
      if(err) {
        callback(false);
        return;
      }
      if(!authToken) {
        callback(false);
        return;
      }
      onTokenFound(authToken);
    });
  }
}

module.exports = functions
