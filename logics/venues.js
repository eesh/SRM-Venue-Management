const Venue = require('../models/Venue')


var functions = {

  addVenue : function (venueDetails, callback) {
    venue = new Venue(venueDetails)
    venue.save(callback)
    return
  },

  getAllVenues : function (callback) {
    Venue.find({}, '-__v', function (err, venues) {
      callback(err, venues)
    })
    return
  },

  removeVenue : function (venueId, callback) {
    Venue.findByIdAndRemove({ _id : venueId }, callback)
    return
  }

}


module.exports = functions
