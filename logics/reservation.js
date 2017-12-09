const Reservation = require('../models/Reservation')
const ReservationLog = require('../models/ReservationLog')

// TODO: Check conflicting dates for reservation
// TODO: Send notifications
// TODO: Show rejection reason

const constants = {
    RESERVATION_PENDING : 0,
    RESERVATION_CONFIRMED : 1,
    RESERVATION_REJECTED : 2
}

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
      Reservation.populate(reservation, { path: 'user', select:'_id name department'}, function (err, reservation) {
        callback(null, reservation)
      })
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
    Reservation.findOneAndUpdate({_id : id}, { $set: params }, { new : true }, function (err, reservation) {
      if(err) {
        return callback(err, null);
      }
      Reservation.populate(reservation, { path: 'user', select:'_id name department'}, function (err, reservation) {
        callback(null, reservation)
      })
    });
  },

  confirmReservation : function (params, callback) {
    var id = params.reservationId
    delete params.reservationId
    Reservation.findOneAndUpdate({_id : id}, { $set: { confirmed: constants.RESERVATION_CONFIRMED } }, { new : true}, function (err, reservation) {
      if(err) {
        return callback(err, null);
      }
      Reservation.populate(reservation, { path: 'user', select:'_id name department'}, function (err, reservation) {
        callback(null, reservation)
      })
    })
  },

  rejectReservation : function (params, callback) {
    var id = params.reservationId
    delete params.reservationId
    Reservation.findOneAndUpdate({_id : id}, { $set: { confirmed: constants.RESERVATION_REJECTED } }, { new : true}, function (err, reservation) {
      if(err) {
        return callback(err, null);
      }
      Reservation.populate(reservation, { path: 'user', select:'_id name department'}, function (err, reservation) {
        callback(null, reservation)
      })
    })
  }
}

module.exports = functions
