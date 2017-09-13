const venueFields = [ 'venueId', 'name', 'coordinates', 'capacity', 'location' ]

var functions = {

    validateVenueCreation : function (params) {
      if(params.capacity == null) return false;
      if(params.name == null) return false;
      if(params.location == null) return false;
      return true;
    },

    sanitizeVenueFields : function (params) {
      var sanitizedObject = {}
      Object.keys(params).forEach(function(key,index) {
        if(venueFields.indexOf(key) != -1) {
          sanitizedObject[key] = params[key]
        }
      });
      return sanitizedObject
    },

    editVenueValidation : function (params) {
      var count = 0
      Object.keys(params).forEach(function(key) {
        if(venueFields.indexOf(key) != -1) {
          count ++
        }
      });
      return count > 1
    }
}

module.exports = functions
