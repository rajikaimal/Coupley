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
  }
};

module.exports = ActivityFeedActions;