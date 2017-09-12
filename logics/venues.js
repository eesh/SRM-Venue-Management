const Venue = require('../models/Venue')

function addVenue(venueDetails, callback) {
  venue = new Venue(venueDetails)
  venue.save(callback)
  return
}

function getAllVenues(callback) {
  Venue.find({}, '-__v', function (err, venues) {
    callback(err, venues)
  })
  return
}

function removeVenue(venueId, callback) {
  Venue.findByIdAndRemove(venueId, callback)
  return
}

module.exports = { addVenue, getAllVenues, removeVenue }
