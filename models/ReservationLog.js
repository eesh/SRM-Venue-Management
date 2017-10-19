const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ReservationSchema = new mongoose.Schema({
  reservationId : { type: Schema.Types.ObjectId, ref: 'Reservation' },
  action : String,
  actionBy : { type: Schema.Types.ObjectId, ref: 'User' },
  reason : String
});

module.exports = mongoose.model('ReservationLog', ReservationSchema)
