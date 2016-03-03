var AppDispatcher = require('../dispatcher/AppDispatcher');
var LoginConstants = require('../constants/LoginConstants');
var SearchConstants = require('../constants/SearchConstants');

var HeaderActions = {
  getprofilename: function (email) {

    $.get('/api/authenticate?token=' + localStorage.getItem('apitoken'), function (response) {
      if (response.token) {
        AppDispatcher.handleViewAction({
          actionType: LoginConstants.PROPOGATE,
          firstname: response.user[0].firstname,
        });
      } else {

      }
    });
  },

  getSearchResults: function (searchkey) {
    if (!searchkey) {

    } else {
      $.get('/api/search?token=' + localStorage.getItem('apitoken') + '&key=' + searchkey + '&username=' + localStorage.getItem('username'), function (response) {
        if (response.status == 201 && response.users) {
          AppDispatcher.handleViewAction({
            actionType: SearchConstants.SEARCH,
            search: response.users,
          });
        } else if (response.status == 200 && response.users == null) {
          AppDispatcher.handleViewAction({
            actionType: SearchConstants.SEARCH,
            search: '',
          });
        }
      }).fail(function () {
        AppDispatcher.handleViewAction({
            actionType: SearchConstants.SEARCH,
            search: 'err',
          });
      });
    }

  },
};

module.exports = HeaderActions;
