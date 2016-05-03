var AppDispatcher = require('../../dispatcher/AppDispatcher');
var RegisterConstants = require('../../constants/RegisterConstants');
var LoginConstants = require('../../constants/LoginConstants');

var UpdateInfo = {
  update: function (data) {
    $.post('/api/profile/updatemain?token=' + localStorage.getItem('apitoken'), data, function (response) {
      console.log('response' + response);
      if (response.status === 200 && response.done == true) {
        localStorage.setItem('email', data.email);
        AppDispatcher.handleViewAction({
          actionType: LoginConstants.CHANGEEMAIL,
          email: data.email,
        });
        location.reload();
      }
    });
  },

  updatePassword: function (credentials) {
    // $.post('/api/profile/updatepassword?token=' + localStorage.getItem('apitoken'), credentials, function (response) {
    //   console.log(response);
    //   if (response.status === 200 && response.done == true) {
    //     location.reload();
    //   } else {

    //   }
    // });


    $.ajax({
      url: '/api/profile/updatepassword?token=' + localStorage.getItem('apitoken'),
      type: 'PUT',
      data: credentials,
      success: function (response) {
        console.log(response);
        if (response.status === 200 && response.done == true) {
          alert('Password changed');
          location.reload();
        } else {
          alert('Something happened please try again');
        }
      },
    }).fail(function () {
      alert('Something happened please try again');
    });
  },
};

module.exports = UpdateInfo;
