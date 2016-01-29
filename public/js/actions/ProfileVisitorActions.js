var AppDispatcher = require('../dispatcher/AppDispatcher');
var ProfileConstants = require('../constants/ProfileConstants');

var LoginActions = {
  loadprofiledata: function(username) {
    console.log('Loading user data of ' + username);
    $.get('/api/visitorprofile?token=' + localStorage.getItem('apitoken') + "&username=" + username, function(response) {
    	console.log('Got user data .....');
    	console.log(response.user[0]);
    	AppDispatcher.handleViewAction({
          actionType: ProfileConstants.VISITOR,
          userdata: response.user[0]
        });
    });
  }
};

module.exports = LoginActions;