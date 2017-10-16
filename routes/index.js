var venues = require('./venues')
var auth = require('./auth')
var reservation = require('./reservation')

var attachRoutes = function attachRoutes(app) {
  auth(app)
  // venues(app)
  // reservation(app)
}

module.exports = attachRoutes
