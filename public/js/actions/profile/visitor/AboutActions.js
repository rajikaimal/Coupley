var AppDispatcher = require('../../../dispatcher/AppDispatcher');
var ProfileConstants = require('../../../constants/ProfileConstants');

var AboutActions = {
  fetchAll: function (visitorUsername) {
    $.get('/api/profile/about?token=' + localStorage.getItem('apitoken') + '&visitorusername=' + visitorUsername, function (response) {
      if (response.status === 200) {
        AppDispatcher.handleViewAction({
          actionType: ProfileConstants.VISITORABOUTLOAD,
          data: response.data[0],
        });
      } else {

      }

    }).fail(function () {
      AppDispatcher.handleViewAction({
        actionType: ProfileConstants.FETCH,
        error: true,
      });
    });
  },

  fetchLookingFor: function (username) {
    $.get('/api/profile/lookingfor?token=' + localStorage.getItem('apitoken') + '&username=' + username, function (response) {
      console.log('Reposad');
      console.log(response);
      AppDispatcher.handleViewAction({
        actionType: ProfileConstants.LOOKINGFOR,
        lookingfor: response.data[0],
      });
    }).fail(function () {
      AppDispatcher.handleViewAction({
        actionType: AboutConstants.FETCH,
        error: true,
      });
    });
  },
};

module.exports = AboutActions;
