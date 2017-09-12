var functions = {

    validateVenueCreation : function (params) {
      if(params.capacity == null) return false;
      if(params.name == null) return false;
      if(params.location == null) return false;
      return true;
    },

    validateRegistrationParams : function (params) {
      if(params.name ==null || params.email == null || params.password == null || params.department == null) return false;
      return true;
    },

    validateLoginDetails: function (params) {
      if(params.email == null || params.password == null) return false;
      return true;
    }
}

module.exports = functions
