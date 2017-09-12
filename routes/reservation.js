var reservationController = require('../controllers/reservation')

var init = function (app) {
  app.post('/reservation', reservationController.makeReservation)
  app.get('/reservation', reservationController.getReservation)
  app.put('/reservation', reservationController.updateReservation)
  app.post('/reservation/cancel', reservationController.cancelReservation)

  app.get('/reservation/all', reservationController.getAllReservations)
  app.post('/reservation/confirmation', reservationController.confirmReservation)
  app.post('/reservation/reject', reservationController.rejectReservation)
}

module.exports = init
