const mongoose = require('mongoose')

var VenueSchema = new mongoose.Schema({
  name : { type: String, unique: true },
  location : String,
  capacity : Number,
  coordinates: [Number]
});

module.exports = mongoose.model('Venue', VenueSchema)
