var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ProfileConstants = require('../../constants/ProfileConstants');
var UpdateActions = {
  checks: function (credentials) {
    $.post('/admin-api/updateAdmin', credentials, function (data) {

      if (data.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: ProfileConstants.GETDATA,
          userdata: credentials,
        });
        swal('Sucess!', 'Updated your profile sucessfully', 'success');
        setTimeout(function () {
          location.reload(true);
        }, 1500);
      } else if (data.status === 203) {
        swal('Something went wrong', 'Please check your internet connection and retry', 'error');
      } else if (data.status === 300) {
        swal('Something Went Wrong', 'Please try again in a moment', 'error');
      }else {
        swal('Error', 'An account with the same email exists already', 'error');
      }
    }).fail(function () {
      swal('Error', 'Something went wrong, Please try again later', 'error');
    });

    document.location = '/cp-admin#/settings';
  },

};

module.exports = UpdateActions;
