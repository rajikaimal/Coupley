var AppDispatcher = require('../dispatcher/AppDispatcher');
var ProfileConstants = require('../constants/ProfileConstants');

var SuggestionActions = {
  getSuggestions: function () {
    $.get('/api/suggestions?token=' + localStorage.getItem('apitoken') + '&username=' + localStorage.getItem('username'), function (response) {
      if (response.status == 200 && response.suggestions) {
        AppDispatcher.handleViewAction({
          actionType: ProfileConstants.SUGGESTIONS,
          suggestions: response.suggestions,
        });
      } else if (response.status == 200 && response.suggestions == null) {
        AppDispatcher.handleViewAction({
          actionType: ProfileConstants.ERR,
          error: '',
        });
      }
    });
  }
};

module.exports = SuggestionActions;
