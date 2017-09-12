const venueController = require('../controllers/venues')

var init = function (app) {
  app.post('/venues', venueController.addVenue)
  app.get('/venues', venueController.getAllVenues)
  app.post('/venues/update', venueController.editVenue)
  app.post('/venues/delte', venueController.deleteVenue)
}

module.exports = init
