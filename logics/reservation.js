const Reservation = require('../models/Reservation')
const ReservationLog = require('../models/ReservationLog')

var functions = {

  makeReservation: function (params, callback) {
    var reservation = new Reservation(params);
    reservation.confirmed = false;
    reservation.save(function (err, reservation) {
      if(err) {
        return callback(err, null);
      }
      if(!reservation) {
        return callback(new Error('Failed to make reservation'), null)
      }
      Reservation.populate(reservation, { path: 'user', select:'_id name department' }, function (err, reservation) {
        callback(null, reservation);
      })
    });
  },

  cancelReservation: function (params, callback) {
    Reservation.findOneAndRemove({_id:params.reservationId}, function(err, reservation) {
      if(err) {
        return callback(err, null);
      }
      if(!reservation) {
        return callback(new Error('No reservation found'), null)
      }
      callback(null, reservation)
    });
  },

  getReservations : function (params, callback) {
    Reservation.find({}).populate({path: 'user', select:'name department'}).exec(function(err, reservations) {
      if(err) {
        return callback(err, null);
      }
      callback(null, reservations);
    });
  },

  editReservation : function (params, callback) {
    var id = params.reservationId
    delete params.reservationId
    Reservation.findOneAndUpdate({_id : id}, { $set: params }, { new : true }, callback);
  }
}

module.exports = functions
