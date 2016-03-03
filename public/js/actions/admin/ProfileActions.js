var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ProfileConstants = require('../../constants/ProfileConstants');

var ProfileActions = {
  getAdminProfileData: function (email) {
    console.log(email);
    $.get('/admin-api/adminprofile?email=' + localStorage.getItem('emails'), function (response) {
      console.log(response.admin[0]);
      if (response) {
        AppDispatcher.handleViewAction({
          actionType: ProfileConstants.GETDATA,
          userdata: response.admin[0],
        });
      } else if (response.status === 300) {
        swal('Something Went Wrong', 'Please try again in a moment', 'error');
      }
    });
  },
};

module.exports = ProfileActions;
