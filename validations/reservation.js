const reservationFields = ['reservationId', 'startTime', 'endTime', 'duration', 'occasion']

var functions = {

    confirmReservationValidation: function (params) {
      if(params.reservationId == null || params.user == null) return false;
      return true;
    },

    rejectReservationValidation: function (params) {
      if(params.reservationId == null || params.user == null) return false;
      return true;
    },

    cancelReservationValidation: function (params) {
      if(params.reservationId == null || params.user == null || params.userType == null) return false;
      return true;
    },

    makeReservationValidation: function (params) {
      if(params.venueId == null || params.user == null || params.startTime == null || params.endTime == null || params.duration == null || params.occasion == null) return false;
      return true;
    },

    editReservationValidation: function (params) {
      var count = 0
      Object.keys(params).forEach(function(key) {
        if(reservationFields.indexOf(key) != -1) {
          count ++
        }
      });
      return count > 1
    },

    sanitizeReservationFields: function (params) {
      var sanitizedObject = {}
      Object.keys(params).forEach(function(key,index) {
        if(reservationFields.indexOf(key) != -1) {
          sanitizedObject[key] = params[key]
        }
      });
      return sanitizedObject
    }
}

module.exports = functions
