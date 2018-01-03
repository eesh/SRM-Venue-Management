var userController = require('../controllers/user')

var init = function (app) {
  app.get('/user/profile', userController.getUser);
}

module.exports = init
