/**
 * Created by Isuru 1 on 27/01/2016.
 */
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var LoginConstants = require('../../constants/LoginConstants');
var SearchConstants = require('../../constants/SearchConstants');

var AdminDetailsActions = {

  getAdmins: function () {
    $.get('/admin-api/adminInfo', function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: SearchConstants.SEARCH,
          search: response.admins,
        });
      }else if (response.status === 300) {
        swal('Something Went Wrong', 'Please try again in a moment', 'error');
      }
    });
  },

};

module.exports = AdminDetailsActions;
