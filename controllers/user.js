const UserLogics = require('../logics/user')

var functions = {

  getUser: function (req, res) {
    var token = req.headers.token;
    if(token == null) {
      return res.json({ success : false, message : 'Unauthorized'})
    }

    UserLogics.getUser(token, function (err, user) {
      if(err) {
        res.json({ success: false, message: err.message });
      } else {
        res.json({ success: true, user: user });
      }
    })
  }
}

module.exports = functions
