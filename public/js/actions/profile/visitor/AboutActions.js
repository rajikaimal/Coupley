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
};

module.exports = AboutActions;
