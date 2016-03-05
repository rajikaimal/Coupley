/**
 * Created by Isuru 1 on 27/01/2016.
 */
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var LoginConstants = require('../../constants/LoginConstants');
var SearchConstants = require('../../constants/SearchConstants');

var UsersActions = {

  getsearchresults: function () {
    $.get('/admin-api/blocked', function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: SearchConstants.SEARCH,
          search: response.users,
        });
      }else if (response.status === 300) {
        swal('Something Went Wrong', 'Please try again in a moment', 'error');
      }
    });
  },

};

module.exports = UsersActions;
