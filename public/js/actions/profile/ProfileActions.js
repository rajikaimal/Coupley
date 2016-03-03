var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ProfileConstants = require('../../constants/ProfileConstants');

var ProfileActions = {
  getProfileData: function (email) {
    
    $.get('/api/profile?token=' + localStorage.getItem('apitoken') + '&email=' + localStorage.getItem('email'), function (response) {
      
      if (response) {
        AppDispatcher.handleViewAction({
          actionType: ProfileConstants.GETDATA,
          userdata: response.user[0],
        });
      } else {
        
      }
    });
  },

  fetchProfilePicture: function (apitoken, username) {
    let data = {
      username: username,
    };
    $.get('/api/getProfilePic?token=' + localStorage.getItem('apitoken'), data, function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: ProfileConstants.PROFILEPIC,
          profilepic: response.image,
        });
      } else {
        
      }
    });
  },

  updateChanges: function (data) {
    $.ajax({
      url: '/api/profile/edit/updatebasics?token=' + localStorage.getItem('apitoken'),
      type: 'POST',
      data: 'token=' + localStorage.getItem('apitoken') +'&firstname=' + data.firstname + '&lastname=' + data.lastname + '&country=' + data.country + '&currentusername=' + data.username,
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
