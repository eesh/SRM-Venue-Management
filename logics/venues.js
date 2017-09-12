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
  },

  editVenue : function (params, callback) {
    var id = params.venueId
    delete params.venueId
    Venue.findOneAndUpdate({_id : id}, { $set: params }, { new : true }, callback);
  }

}


module.exports = functions
