const bcrypt = require('bcrypt')
const saltRounds = 8;
const whirlpool = require('whirlpool')

var functions = {
  hashPassword : function (password, callback) {
    // var salt = password.substr(0, 5);
    // bcrypt.genSalt(saltRounds)
    // bcrypt.hash(password, salt, callback);
    callback(null, whirlpool(password));
  },

  uuid : function (length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}

module.exports  = functions
