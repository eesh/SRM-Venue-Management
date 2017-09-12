var functions = {

    validateVenueCreation : function (params) {
      if(params.capacity == null) return false;
      if(params.name == null) return false;
      if(params.location == null) return false;
      return true;
    }
}

module.exports = functions
