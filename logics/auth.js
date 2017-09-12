const AuthToken = require('../models/AuthToken')
const User = require('../models/User')
const utils = require('../utils/utils')

function validateUser(token) {

  function onUserFound(user, err) {
    if(err) return null
    if(!user) return null
    return user;
  }

  function onAuthToken(authToken, err) {
    if(err) return null
    if(!authToken) return null
    if(authToken.expiry < new Date.now) return null
    User.find({ id : authToken.userId }, onUserFound)
  }

  AuthToken.find({ token : token }, onAuthToken)
}


function performUserRegistration(params, callback) {

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
      sendRegistrationEmail(user.email, function () {
        callback(err, user)
      })
    })
  }
  utils.hashPassword(params.password, onPasswordGenerated)
}

function performLogin(params, callback) {
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
      callback(null, authToken);
    })
  }

  function generateAuthToken(userid) {
    attempts --;
    var params = {
      token : utils.uuid(64),
      userId : userid,
      expiry : Date.now() + 3 * 86400 * 1000
    }

    AuthToken.findOneAndRemove({ userId : userid }, function (err, removedDoc) {
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
        console.log(user);
        callback(new Error('User not found'), null);
        return;
      }
      console.log(user.id);
      generateAuthToken(user.id);
    })
  }
  utils.hashPassword(params.password, onPasswordGenerated)
}

function sendRegistrationEmail(email, callback) {
  callback();
}

module.exports = { validateUser, performUserRegistration, performLogin }
