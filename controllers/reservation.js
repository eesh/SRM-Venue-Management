const validations = require('../validations/reservation')
const AuthLogics = require('../logics/auth')
const ReservationLogics = require('../logics/reservation')


function makeReservation(req, res) {
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
      return res.json({success:false, message: 'Missing parameters'})
    }
    performRegistration();
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
}

function getReservation(req, res) {
  res.json({success: true, message: 'Api not ready'})
}

function updateReservation(req, res) {
  res.json({success: true, message: 'Api not ready'})
}

function cancelReservation(req, res) {
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
}

function getAllReservations(req, res) {
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
}

function confirmReservation(req, res) {
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
}

function rejectReservation(req, res) {
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

module.exports = { makeReservation, getReservation, updateReservation, cancelReservation, getAllReservations, confirmReservation, rejectReservation}
