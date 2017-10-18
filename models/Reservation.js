const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ReservationSchema = new mongoose.Schema({
  user : { type: Schema.Types.ObjectId, ref: 'User' },
  venueId : { type: Schema.Types.ObjectId, ref: 'Venue' },
  startTime : Date,
  endTime : Date,
  duration : Number,
  occasion : String,
  confirmed : Boolean
});

module.exports = mongoose.model('Reservation', ReservationSchema)
