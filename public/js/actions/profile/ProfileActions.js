var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ProfileConstants = require('../../constants/ProfileConstants');

var ProfileActions = {
  getProfileData: function(email) {
    console.log(email);
  	$.get('/api/profile?token=' + localStorage.getItem('apitoken') + '&email=' + localStorage.getItem('email'), function(response) {
  		console.log(response.user[0]);
  	  if(response) {
        AppDispatcher.handleViewAction({
          actionType: ProfileConstants.GETDATA,
          userdata: response.user[0]
        });
      }
      else {
        console.log(response);
      }
    });
  }
};

module.exports = ProfileActions;