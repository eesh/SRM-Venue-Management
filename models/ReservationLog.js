const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ReservationSchema = new mongoose.Schema({
  reservationId : Schema.Types.ObjectId,
  action : String,
  actionBy : Schema.Types.ObjectId,
  reason : String
});

module.exports = mongoose.model('ReservationLog', ReservationSchema)
