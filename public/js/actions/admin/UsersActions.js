/**
 * Created by Isuru 1 on 27/01/2016.
 */
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var LoginConstants = require('../../constants/LoginConstants');
var SearchConstants = require('../../constants/FeedConstants');

var UsersActions = {

  getsearchresults: function () {
    $.get('/admin-api/search', function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: SearchConstants.SEARCH,
          search: response.users,
        });
      }      else if (response.status == 505) {
        console.log('Error 505');
        document.location = '/#/search/err';
      }
    });
  },

};

module.exports = UsersActions;
