var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ProfileConstants = require('../../constants/ProfileConstants');

var ProfileActions = {
  getProfileData: function (email) {
    console.log(email);
    $.get('/api/profile?token=' + localStorage.getItem('apitoken') + '&email=' + localStorage.getItem('email'), function (response) {
      console.log(response.user[0]);
      if (response) {
        AppDispatcher.handleViewAction({
          actionType: ProfileConstants.GETDATA,
          userdata: response.user[0],
        });
      } else {
        console.log(response);
      }
    });
  },

  fetchProfilePicture: function (apitoken, username) {
    let data = {
      apitoken: apitoken,
      username: username,
    };
    $.get('/api/getProfilePic', data, function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: ProfileConstants.PROFILEPIC,
          profilepic: response.image,
        });
      } else {
        console.log('Error');
      }
    });
  },

  updatechanges: function (data) {
    $.ajax({
      url: '/api/profile/edit/updatebasics',
      type: 'PUT',
      data: 'firstname=' + data.firstname + '&lastname=' + data.lastname + '&country=' + data.country + '&currentusername=' + data.username,
      success: function (response) {
        AppDispatcher.handleViewAction({
          actionType: ProfileConstants.GETDATA,
          userdata: data,
        });
        location.reload();
      },
    });
  },
};

module.exports = ProfileActions;
