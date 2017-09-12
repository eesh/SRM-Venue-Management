const mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  name : String,
  email : { type: String, unique: true },
  password : String,
  admin : Boolean,
  department : String,
  totalReservations : Number
});

module.exports = mongoose.model('User', UserSchema)
