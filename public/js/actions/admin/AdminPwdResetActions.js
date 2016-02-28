var AppDispatcher = require('../../dispatcher/AppDispatcher');
var RegisterConstants = require('../../constants/RegisterConstants');

var PwdActions = {
  reset: function (credentials) {
    console.log(credentials);
    $.post('/admin-api/reset', credentials, function (data) {

      if (data.status === 201) {
        swal('Error', 'Entered current Password is incorrect', 'error');
      } else if (data.status === 203) {
        swal('Error', 'Please check your internet connection and retry', 'error');
      } else if (data.status === 200) {
        location.reload(true);
        swal('Good job!', 'Updated your password', 'success');
        return true;
      }
    });

  },

};

module.exports = PwdActions;
