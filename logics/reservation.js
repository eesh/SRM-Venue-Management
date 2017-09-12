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
      callback(null, reservation);
    });
  },

  cancelReservation: function (params, callback) {
    Reservation.findOneAndRemove({id:params.reservationId}, function(err, reservation) {
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
    Reservation.find({by:params.userId}, function(err, reservation) {
      if(err) {
        return callback(err, null);
      }
      callback(null, reservation)
    });
  }
}

module.exports = functions
