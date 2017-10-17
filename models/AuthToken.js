const mongoose = require('mongoose')

var AuthTokenSchema = new mongoose.Schema({
  token : { type: String, unique: true },
  user : { type: mongoose.Schema.Types.ObjectId, unique: true, ref: 'User' },
  expiry : Number
})

module.exports = mongoose.model('AuthToken', AuthTokenSchema)
