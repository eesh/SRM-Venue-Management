const VenueLogics = require('../logics/venues')
const validations = require('../utils/validations')

function getAllVenues(req, res) {

  VenueLogics.getAllVenues(function (err, venues) {
    if(err) {
      res.json({ success : false, message : 'Failed to retrieve venues'})
      return
    }
    if(!venues){
      res.json({ success : false, message : 'Venues returned null'})
      return
    }
    res.json({ success : true, venues : venues })
  })
}

function addVenue(req, res) {
  var params = {}
  if(!validations.validateVenueCreation(req.body)) {
    res.json({ success : false, message: 'Missing parameters' })
    return
  } else {
    params.name = req.body.name
    params.capacity = req.body.capacity
    params.location = req.body.location
    if(req.body.coordinates != null) {
      params.coordinates = req.body.coordinates
    }
  }
  VenueLogics.addVenue(params, function (err, doc) {
    if(err) {
      res.json({ success : false, message: err })
      return
    }
    res.json({ success : true, venueDetails: venue })
  })
}

function editVenue(req, res) {
  res.json({success: true, message: 'Api not ready'})
}

function deleteVenue(req, res) {
  if(!req.params.venueId) {
    res.json({ success : false, message : 'Venue ID missing' })
    return
  }
  var venueId = req.params.venueId
  VenueLogics.removeVenue(venueId, function (err, venue) {
    if(err) {
      res.json({ success : false, message : err})
      return
    }
    if(!venue) {
      res.json({ success : false, message : 'No such venue' })
      return
    }
    res.json({ success : true, message : 'Venue removed '})
  })
}

module.exports = { getAllVenues, addVenue, editVenue, deleteVenue }
