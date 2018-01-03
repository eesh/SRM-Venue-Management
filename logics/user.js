const User = require('../models/User')
const Auth = require('../models/AuthToken')

var functions = {

  getUser: function (authToken, callback) {
    if(authToken == null) {
      return res.json({ success : false, message : 'Unauthorized'})
    }

    function findUser(userId) {
      if(userId == null) {
        callback(new Error("UserId is null"), null);
        return
      }
      User.findOne({ _id: userId }, function (err, user) {
        if(err) {
          callback(err, null);
        } else {
          if(user == null) {
            callback(new Error("User is null"), null);
          } else {
            callback(null, user);
          }
        }
      })
    }

    Auth.findOne({ token: authToken }, function (err, authToken) {
      if(err) {
        callback(err, null);
      } else {
        findUser(authToken.user);
      }
    })
  }
}

module.exports = functions
