const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ReservationSchema = new mongoose.Schema({
  By : Schema.Types.ObjectId,
  startTime : Date,
  endTime : Date,
  duration : Number,
  occasion : String
});

module.exports = mongoose.model('Reservation', ReservationSchema)
