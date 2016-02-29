var AppDispatcher = require('../../dispatcher/AppDispatcher');
var RegisterConstants = require('../../constants/RegisterConstants');

var PwdActions = {
  reset: function (credentials) {
    console.log(credentials);
    $.post('/admin-api/reset', credentials, function (data) {

      if (data.status === 201) {
        swal('Error', 'Entered current Password is incorrect. Please re enter your current password.', 'error');
      } else if (data.status === 203) {
        swal('Something Went Wrong', 'Please check your internet connection and retry', 'error');
      } else if (data.status === 200) {
        swal('Sucess!', 'Updated your password successfully', 'success');
        setTimeout(function () {
          location.reload(true);
        }, 1500);
      }
    });

  },

};

module.exports = PwdActions;
