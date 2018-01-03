const mongoose = require('mongoose')
const Schema = mongoose.Schema
const reservationConstants = require('../constants/reservation')

var ReservationSchema = new mongoose.Schema({
  user : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  venueId : { type: Schema.Types.ObjectId, ref: 'Venue' },
  startTime : Date,
  endTime : Date,
  duration : Number,
  occasion : String,
  capacity : Number,
  confirmed : {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Reservation', ReservationSchema)
