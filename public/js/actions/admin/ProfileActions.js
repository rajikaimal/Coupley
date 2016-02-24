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
      } else {
        console.log(response);
      }
    });
  },
};

module.exports = ProfileActions;
