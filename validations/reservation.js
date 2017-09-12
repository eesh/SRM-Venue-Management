var functions = {

    confirmReservationValidation: function (params) {
      if(params.reservationId == null || params.userId == null) return false;
      return true;
    },

    rejectReservationValidation: function (params) {
      if(params.reservationId == null || params.userId == null) return false;
      return true;
    },

    cancelReservationValidation: function (params) {
      if(params.reservationId == null || params.userId == null || params.userType == null) return false;
      return true;
    },

    makeReservationValidation: function (params) {
      if(params.userId == null || params.startTime == null || params.endtime == null || params.duration == null || params.occasion == null) return false;
      return true;
    }
}

module.exports = functions
