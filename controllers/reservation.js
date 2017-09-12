const Reservation = require('../models/Reservation')
const ReservationLog = require('../models/ReservationLog')
const User = require('../models/User')
const validations = require('../utils/validations')

function makeReservation(req, res) {
  res.json({success: true, message: 'Api not ready'})
}

function getReservation(req, res) {
  res.json({success: true, message: 'Api not ready'})
}

function updateReservation(req, res) {
  res.json({success: true, message: 'Api not ready'})
}

function cancelReservation(req, res) {
  res.json({success: true, message: 'Api not ready'})
}

function getAllReservations(req, res) {
  res.json({success: true, message: 'Api not ready'})
}

function confirmReservation(req, res) {
  res.json({success: true, message: 'Api not ready'})
}

function rejectReservation(req, res) {
  res.json({success: true, message: 'Api not ready'})
}

module.exports = { makeReservation, getReservation, updateReservation, cancelReservation, getAllReservations, confirmReservation, rejectReservation}
