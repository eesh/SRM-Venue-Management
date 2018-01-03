var venues = require('./venues')
var auth = require('./auth')
var reservation = require('./reservation')
var user = require('./user')

var attachRoutes = function attachRoutes(app) {
  auth(app)
  venues(app)
  reservation(app)
  user(app)
}

module.exports = attachRoutes
