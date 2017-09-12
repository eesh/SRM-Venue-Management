const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ReservationSchema = new mongoose.Schema({
  reservationId : Schema.Types.ObjectId,
  confirmed : Boolean,
  reason : String
});

module.exports = mongoose.model('ReservationLog', ReservationSchema)
