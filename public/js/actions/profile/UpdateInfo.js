var AppDispatcher = require('../../dispatcher/AppDispatcher');
var RegisterConstants = require('../../constants/RegisterConstants');
var LoginConstants = require('../../constants/LoginConstants');

var UpdateInfo = {
  update: function (data) {
    $.post('/api/profile/updatemain?token=' + localStorage.getItem('apitoken'), data, function (response) {
      console.log('response' + response);
      if (response.status === 200 && response.done == true) {
        AppDispatcher.handleViewAction({
          actionType: LoginConstants.CHANGEEMAIL,
          email: data.email,
        });
        location.reload();
      }
    });
  },

  updatePassword: function (credentials) {
    $.post('/api/profile/updatepassword?token=' + localStorage.getItem('apitoken'), credentials, function (response) {
      if (response.status === 200 && response.done == true) {
        location.reload();
      } else {

      }
    });
  },
};

module.exports = UpdateInfo;
