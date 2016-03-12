/**
 * Created by Isuru 1 on 27/01/2016.
 */
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var GraphConstants = require('../../constants/GraphConstants');

var GraphActions = {

  userStatus: function () {
    $.get('/admin-api/userStatus', function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: GraphConstants.USERS,
          Users: response.users,
        });
      }      else if (response.status === 300) {
        swal('Something Went Wrong', 'Please try again in a moment', 'error');
      }
    });
  },

  userRegistrations: function () {
    $.get('/admin-api/userRegistrations', function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: GraphConstants.USERS,
          Users: response.users,
        });
      }      else if (response.status === 300) {
        swal('Something Went Wrong', 'Please try again in a moment', 'error');
      }
    });
  },

  userStats: function () {
    $.get('/admin-api/userStats', function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: GraphConstants.USERS,
          Users: response.users,
        });
      }      else if (response.status === 300) {
        swal('Something Went Wrong', 'Please try again in a moment', 'error');
      }
    });
  },

};

module.exports = GraphActions;
