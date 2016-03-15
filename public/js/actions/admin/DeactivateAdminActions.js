var AppDispatcher = require('../../dispatcher/AppDispatcher');
var SearchConstants = require('../../constants/SearchConstants');

var DeactivateActions = {
  deactivate: function (credentials) {
    $.post('/admin-api/deactivateAdmin', credentials, function (data) {
      if (data.status === 201) {
        swal('Deactivated!', 'Your account has been deactivated.', 'success');
        setTimeout(function () {
          location.href = '/cp-admin#/AdminSignout';
        }, 1500);
      } else if (data.status === 300) {
        swal('Something Went Wrong', 'Please try again in a moment', 'error');
      }
    });

  },
};

module.exports = DeactivateActions;
