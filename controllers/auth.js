const validations = require('../validations/auth')
const AuthLogics = require('../logics/auth')

function registerUser (req, res) {
  var token = req.query.token
  // if(!AuthLogics.isAdmin(token)) {
  //   res.json({success:false, message:'You are not an admin'})
  //   return
  // }
  var params = {}
  if(!validations.validateRegistrationParams(req.body)) {
    res.json({success : false, message : 'Missing parameters'})
    return
  } else {
    params = req.body
    if(!req.body.type) {
      params.type = 'user'
    }
  }
  AuthLogics.performUserRegistration(params, function (err, user) {
    if(err) {
      res.json({ success : false, message: err.message })
      return
    }
    res.json({ success : true, userDetails: user })
  })
}



function loginUser (req, res) {
  var params = {}
  if(!validations.validateLoginDetails(req.body)) {
    res.json({success : false, message : 'Missing parameters'})
    return
  }
  params.email = req.body.email
  params.password = req.body.password
  AuthLogics.performLogin(params, function (err, authToken) {
    if(err) {
      res.json({ success : false, message: err.message })
      return
    }
    res.json({ success : true, tokenDetails: authToken })
  })
}

module.exports = { registerUser, loginUser }
