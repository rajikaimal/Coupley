var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ProfileConstants = require('../../constants/ProfileConstants');

var ActivityFeedActions = {
  getfeed: function () {
    $.get('/api/profile/feed?token=' + localStorage.getItem('apitoken') + '&username=' + localStorage.getItem('username'), function (response) {
      if (response.status === 200) {
        AppDispatcher.handleViewAction({
          actionType: ProfileConstants.FEED,
          feed: response.data,
        });
      } else {
        AppDispatcher.handleViewAction({
          actionType: ProfileConstants.ERR,
          error: true,
        });
      }
    });
  },

  editActvity: function (data) {
    $.ajax({
      url: '/api/profile/edit/activity',
      type: 'PUT',
      data: 'token=' + localStorage.getItem('apitoken') + '&email=' + localStorage.getItem('email') + '&editActvity=' + data,
      success: function (response) {
        
        if (response.status === 200) {
          AppDispatcher.handleViewAction({
            actionType: ProfileConstants.FEED,
            editActvity: data,
          });
        } else {
          AppDispatcher.handleViewAction({
            actionType: ProfileConstants.ERR,
            error: true,
          });
        }
      },
    });
  },
};

module.exports = ActivityFeedActions;
