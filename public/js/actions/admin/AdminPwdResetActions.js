var AppDispatcher = require('../../dispatcher/AppDispatcher');
var RegisterConstants = require('../../constants/RegisterConstants');

var PwdActions = {
  reset: function (credentials) {
    console.log(credentials);
    $.post('/admin-api/reset', credentials, function (data) {

      if (data.status === 500) {

        swal('Error', 'Password incorrect', 'error');
      }

      if (data.status === 400) {
        swal('Error', 'Please check your internet connection and retry', 'error');
      } else {
        document.location.reload();
        swal('Good job!', 'Updated your password', 'success');
      }
    }).fail(function () {
      swal('Error', 'Password incorrect', 'error');
    });

  },

};

module.exports = PwdActions;
