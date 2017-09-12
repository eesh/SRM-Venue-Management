const mongoose = require('mongoose')

var AuthTokenSchema = new mongoose.Schema({
  token : { type: String, unique: true },
  userId : { type: mongoose.Schema.Types.ObjectId, unique: true },
  expiry : Number
})

module.exports = mongoose.model('AuthToken', AuthTokenSchema)
