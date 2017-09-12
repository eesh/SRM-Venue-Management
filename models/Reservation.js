const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ReservationSchema = new mongoose.Schema({
  userId : Schema.Types.ObjectId,
  startTime : Date,
  endTime : Date,
  duration : Number,
  occasion : String,
  confirmed : Boolean
});

module.exports = mongoose.model('Reservation', ReservationSchema)
