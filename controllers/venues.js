const VenueLogics = require('../logics/venues')
const validations = require('../validations/venues')


var functions = {

  getAllVenues : function (req, res) {

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
  },

  addVenue : function (req, res) {
    var params = {}
    if(!validations.validateVenueCreation(req.body)) {
      res.json({ success : false, message: 'Missing parameters' })
      return
    } else {
      params = req.body;
    }
    console.log(params)
    VenueLogics.addVenue(params, function (err, doc) {
      if(err) {
        res.json({ success : false, message: err.message })
        return
      }
      res.json({ success : true, venueDetails: venue })
    })
  },

  editVenue : function (req, res) {
    var params = {}
    if(!validations.editVenueValidation(req.body)) {
      return res.json({success : false, message : 'Invalid parameters'})
    }
    params = validations.sanitizeVenueFields(req.body);
    VenueLogics.editVenue(params, function (err, venue) {
      if(err) {
        res.json({ success : false, message: err.message})
        return
      }
      res.json({ success : true, venueDetails: venue })
    })
  },

  deleteVenue : function (req, res) {
    if(!req.body.venueId) {
      res.json({ success : false, message : 'Venue ID missing' })
      return
    }
    var venueId = req.body.venueId
    VenueLogics.removeVenue(venueId, function (err, venue) {
      if(err) {
        res.json({ success : false, message : err})
        return
      }
      if(!venue) {
        res.json({ success : false, message : 'No such venue' })
        return
      }
      res.json({ success : true, message : 'Venue removed'})
    })
  }

}


module.exports =  functions
