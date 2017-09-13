const validations = require('../validations/reservation')
const AuthLogics = require('../logics/auth')
const ReservationLogics = require('../logics/reservation')

var functions = {

  makeReservation: function (req, res) {
    var token = req.headers.token;
    var params = {};
    if(token == null) {
      return res.json({ success : false, message : 'Unauthorized'})
    }
    AuthLogics.validateUser(token, (error, user) => {
      if(error) {
        res.json({success:false, message: error.message})
        return;
      } else {
        params = req.body;
        params.userId = user.id;
        params.userType = user.type;
        verifyParams();
      }
    })

    function verifyParams() {
      if(!validations.makeReservationValidation(params)) {
        console.log(params)
        return res.json({success:false, message: 'Missing parameters'})
      }
      next();
    }

    function next() {
      ReservationLogics.makeReservation(params, function (err, reservation) {
        if(err) {
          return res.json({ success : false, message : err.message });
        }
        res.json({ success : true, reservationDetails: reservation })
        return;
      })
    }
  },

  getReservation: function (req, res) {
    res.json({success: true, message: 'Api not ready'})
  },

  updateReservation: function (req, res) {
    var params = {}
    if(!validations.editReservationValidation(req.body)) {
      return res.json({success : false, message : 'Invalid parameters'})
    }
    params = validations.sanitizeReservationFields(req.body);
    ReservationLogics.editReservation(params, function (err, venue) {
      if(err) {
        res.json({ success : false, message: err.message})
        return
      }
      res.json({ success : true, reservationDetails: venue })
    })
  },

  cancelReservation: function (req, res) {
    var token = req.headers.token;
    var params = {};
    if(token == null) {
      return res.json({ success : false, message : 'Unauthorized'})
    }

    AuthLogics.validateUser(token, (error, user) => {
      if(error) {
        res.json({success:false, message: error.message})
        return;
      } else {
        params = req.body;
        params.userId = user.id;
        params.userType = user.type;
        verifyParams();
      }
    })

    function verifyParams() {
      if(!validations.cancelReservationValidation(params)) {
        return res.json({success:false, message: 'Missing parameters'})
      }
      cancelReservation();
    }

    function cancelReservation() {
      ReservationLogics.cancelReservation(params, function (err, reservation) {
        if(err) {
          return res.json({ success : false, message : err.message });
        }
        res.json({ success : true, message: 'Reservaton cancelled', reservationDetails : reservation })
        return;
      })
    }
  },

  getAllReservations: function (req, res) {
    var token = req.headers.token;
    var params = {};
    if(token == null) {
      return res.json({ success : false, message : 'Unauthorized'})
    }

    AuthLogics.validateUser(token, (error, user) => {
      if(error) {
        res.json({success:false, message: error.message})
        return;
      } else {
        params.userId = user.id;
        getReservations();
      }
    })

    function getReservations() {
      ReservationLogics.getReservations(params, function (err, reservations) {
        if(err) {
          return res.json({ success : false, message : err.message });
        }
        res.json({ success : true, 'reservations' : reservations })
        return;
      })
    }
  },

  confirmReservation: function (req, res) {
    var token = req.headers.token;
    var params = {};
    if(token == null) {
      return res.json({ success : false, message : 'Unauthorized'})
    }

    AuthLogics.isAdmin(token, (error, user) => {
      if(error) {
        res.json({success:false, message: error.message})
        return;
      } else {
        params = req.body;
        params.userId = user.id;
        verifyParams();
      }
    })

    function verifyParams() {
      if(!validations.confirmReservationValidation(req.body)) {
        return res.json({success:false, message: 'Missing parameters'});
      }
      ReservationLogics.confirmReservation(params, function (err, reservation) {
        if(err) {
          return res.json({ success : false, message : err.message });
        }
        res.json({ success : true, 'reservationDetails' : reservation })
        return;
      });
    }
  },

  rejectReservation: function (req, res) {
    var token = req.headers.token;
    var params = {};
    if(token == null) {
      return res.json({ success : false, message : 'Unauthorized'})
    }

    AuthLogics.isAdmin(token, (error, user) => {
      if(error) {
        res.json({success:false, message: error.message})
        return;
      } else {
        params = req.body;
        params.userId = user.id;
        verifyParams();
      }
    })

    function verifyParams() {
      if(!validations.rejectReservationValidation(req.body)) {
        return res.json({success:false, message: 'Missing parameters'});
      }
      ReservationLogics.rejectReservation(params, function (err, reservation) {
        if(err) {
          return res.json({ success : false, message : err.message });
        }
        res.json({ success : true, 'reservationDetails' : reservation })
        return;
      });
    }
  }


}

module.exports = functions
