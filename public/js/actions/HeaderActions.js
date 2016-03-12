var AppDispatcher = require('../dispatcher/AppDispatcher');
var LoginConstants = require('../constants/LoginConstants');
var SearchConstants = require('../constants/SearchConstants');
var ProfileConstants = require('../constants/ProfileConstants');

var HeaderActions = {
  getprofilename: function (email) {

    $.get('/api/authenticate?token=' + localStorage.getItem('apitoken'), function (response) {
      if (response.token) {
        AppDispatcher.handleViewAction({
          actionType: LoginConstants.PROPOGATE,
          firstname: response.user[0].firstname,
        });
      } else {
        AppDispatcher.handleViewAction({
          actionType: LoginConstants.ERR,
          error: true,
        });
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

  postFeedback: function (data) {
    $.post('/api/feedback?token=' + localStorage.getItem('apitoken'), data, function (response) {
      if (response.status == 200 && response.done == true) {
        AppDispatcher.handleViewAction({
          actionType: ProfileConstants.DONE,
          done: true,
        });
      } else {
        AppDispatcher.handleViewAction({
          actionType: ProfileConstants.ERR,
          error: true,
        });
      }
    });
  },
};

module.exports = HeaderActions;
