var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ProfileConstants = require('../../constants/ProfileConstants');
var UpdateActions = {
  checks: function (credentials) {
    console.log(credentials);
    $.post('/admin-api/updateAdmin', credentials, function (data) {

      if (data.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: ProfileConstants.GETDATA,
          userdata: credentials,
        });
        document.location.reload();
        swal('Good job!', 'Updated your profile', 'success');
      } else if (data.status === 400) {
        swal('Error', 'Please check your internet connection and retry', 'error');
      } else {
        swal('Error', 'An account with the same email exists already', 'error');
      }
    }).fail(function () {
      swal('Error', 'Something went wrong, Please try again later', 'error');
    });

    document.location = '/cp-admin#/settings';
  },

};

module.exports = UpdateActions;
