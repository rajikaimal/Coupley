var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ProfileConstants = require('../../constants/ProfileConstants');

var ActivityFeedActions = {
  getfeed: function() {
  	$.get('/api/profile/feed?token=' + localStorage.getItem('apitoken') + '&username=' + localStorage.getItem('username'), function(response) {
  	  if(response.status === 200) {
        AppDispatcher.handleViewAction({
          actionType: ProfileConstants.FEED,
          feed: response.data
        });
      }
      else {

      }
    });
  },
  editActvity: function(data) {
    $.ajax({
      url: '/api/profile/edit/activity',
      type: 'PUT',
      data: "email=" + localStorage.getItem('email') + "&editActvity=" + data,
      success: function(response) {
        console.log('DOne ... ' + response);
        if(response.status === 200) {
          AppDispatcher.handleViewAction({
            actionType: ProfileConstants.FEED,
            editActvity: data
          });
        } 
        else {
          console.log('Somthing happened');
        }
      }
    });
  }
};

module.exports = ActivityFeedActions;