var registrationController = require('../controllers/auth')

var init = function (app) {
  app.post('/auth/register', registrationController.registerUser);
  app.post('/auth/login', registrationController.loginUser);
}

module.exports = init
